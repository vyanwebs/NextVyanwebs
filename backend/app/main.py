from __future__ import annotations

import json
import threading
from collections import defaultdict
from datetime import datetime, timezone
import time

from fastapi import BackgroundTasks, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from .schemas import ChatRequest, ChatResponse
from .services import (
    build_fallback_reply,
    generate_gemini_reply,
    generate_reference_id,
    init_groq_client,
    load_settings,
    send_owner_email,
    stream_gemini_reply,
)

settings = load_settings()

app = FastAPI(title="Vyanwebs Chatbot API", version="1.0.0")

# Initialize Groq client once at startup
init_groq_client(settings.groq_api_key)

# Rate limiting: Max 10 requests per minute per session
RATE_LIMIT = {"max_requests": 10, "window_seconds": 60}
request_times = defaultdict(list)

SESSION_IDLE_SECONDS = 90
session_state: dict[str, dict[str, object]] = {}
session_state_lock = threading.RLock()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def check_rate_limit(session_id: str) -> None:
    """Check if the session has exceeded the rate limit."""
    current_time = time.time()
    cutoff_time = current_time - RATE_LIMIT["window_seconds"]

    # Remove old requests outside the window
    request_times[session_id] = [
        req_time for req_time in request_times[session_id] if req_time > cutoff_time
    ]

    # Check if limit exceeded
    if len(request_times[session_id]) >= RATE_LIMIT["max_requests"]:
        raise HTTPException(
            status_code=429,
            detail=f"Rate limit exceeded. Max {RATE_LIMIT['max_requests']} requests per {RATE_LIMIT['window_seconds']} seconds.",
        )

    # Add current request time
    request_times[session_id].append(current_time)


def get_session_key(request: ChatRequest) -> str:
    return request.session_id or "guest"


def get_or_create_session(session_id: str, request: ChatRequest) -> dict[str, object]:
    with session_state_lock:
        state = session_state.get(session_id)
        if state is None:
            state = {
                "reference_id": generate_reference_id(session_id),
                "session_id": session_id,
                "user_name": request.user_name,
                "user_email": request.user_email,
                "page_url": request.page_url,
                "conversation": [],
                "timer": None,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "email_sent": False,
            }
            session_state[session_id] = state
        else:
            if request.user_name and not state.get("user_name"):
                state["user_name"] = request.user_name
            if request.user_email and not state.get("user_email"):
                state["user_email"] = request.user_email
            if request.page_url:
                state["page_url"] = request.page_url
        return state


def schedule_session_email(session_id: str) -> None:
    def flush_session_email() -> None:
        with session_state_lock:
            state = session_state.get(session_id)
            if not state or state.get("email_sent"):
                return

            conversation = state.get("conversation") or []
            if not conversation:
                return

            email_payload = {
                "reference_id": state["reference_id"],
                "session_id": state["session_id"],
                "user_name": state.get("user_name"),
                "user_email": state.get("user_email"),
                "page_url": state.get("page_url"),
                "created_at": datetime.now(timezone.utc).isoformat(),
                "conversation": conversation,
            }
            state["email_sent"] = True

        try:
            send_owner_email(email_payload, settings)
        except Exception:
            with session_state_lock:
                current_state = session_state.get(session_id)
                if current_state:
                    current_state["email_sent"] = False

    with session_state_lock:
        state = session_state.get(session_id)
        if not state:
            return

        existing_timer = state.get("timer")
        if existing_timer:
            existing_timer.cancel()

        timer = threading.Timer(SESSION_IDLE_SECONDS, flush_session_email)
        timer.daemon = True
        state["timer"] = timer
        timer.start()


def record_session_turn(
    session_id: str,
    request: ChatRequest,
    message: str,
    reply: str,
) -> None:
    with session_state_lock:
        state = get_or_create_session(session_id, request)
        conversation = state.setdefault("conversation", [])
        conversation.append(
            {
                "message": message,
                "reply": reply,
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
        )

    schedule_session_email(session_id)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "vyanwebs-chatbot"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, background_tasks: BackgroundTasks) -> ChatResponse:
    # Check rate limit
    session_id = get_session_key(request)
    check_rate_limit(session_id)

    message = request.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="message is required")

    reference_id = generate_reference_id(request.session_id)
    created_at = datetime.now(timezone.utc).isoformat()

    try:
        reply = generate_gemini_reply(message, settings, user_name=request.user_name)
    except Exception as exc:  # noqa: BLE001
        reply = build_fallback_reply(message)

    email_enabled = bool(
        settings.smtp_host and settings.smtp_username and settings.smtp_password
    )
    if email_enabled:
        record_session_turn(session_id, request, message, reply)

    response = ChatResponse(
        reply=reply,
        reference_id=reference_id,
        email_status="queued" if email_enabled else "skipped",
        model=settings.groq_model,
    )
    return response


@app.post("/chat/stream")
def chat_stream(request: ChatRequest) -> StreamingResponse:
    session_id = get_session_key(request)
    check_rate_limit(session_id)

    message = request.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="message is required")

    reference_id = generate_reference_id(request.session_id)
    created_at = datetime.now(timezone.utc).isoformat()
    email_enabled = bool(
        settings.smtp_host and settings.smtp_username and settings.smtp_password
    )

    def event_stream():
        collected_chunks: list[str] = []

        yield json.dumps(
            {
                "type": "meta",
                "reference_id": reference_id,
                "email_status": "queued" if email_enabled else "skipped",
                "model": settings.groq_model,
            }
        ) + "\n"

        try:
            for chunk in stream_gemini_reply(
                message, settings, user_name=request.user_name
            ):
                collected_chunks.append(chunk)
                yield json.dumps({"type": "chunk", "chunk": chunk}) + "\n"

            reply = "".join(collected_chunks).strip() or build_fallback_reply(message)
            source = "groq"
        except Exception as exc:  # noqa: BLE001
            reply = build_fallback_reply(message)
            source = "fallback"
            yield json.dumps(
                {
                    "type": "meta",
                    "warning": "Groq is temporarily unavailable, using fallback reply.",
                    "error": str(exc),
                }
            ) + "\n"

        if email_enabled:
            record_session_turn(session_id, request, message, reply)

        yield json.dumps(
            {
                "type": "done",
                "reference_id": reference_id,
                "reply": reply,
                "email_status": "queued" if email_enabled else "skipped",
                "model": settings.groq_model,
                "source": source,
            }
        ) + "\n"

    return StreamingResponse(event_stream(), media_type="application/x-ndjson")
