from __future__ import annotations

import os
import smtplib
import ssl
import time
from pathlib import Path
from dataclasses import dataclass
from datetime import datetime, timezone
from email.message import EmailMessage
from typing import Any

from groq import Groq
import re
from dotenv import load_dotenv

SYSTEM_PROMPT = """You are the Vyanwebs website assistant. 

CRITICAL INSTRUCTIONS - READ CAREFULLY:
============================================
1. You ONLY answer questions about:
   - Vyanwebs Pvt Ltd (the company, its services, team, culture)
   - Web development, app development, UI/UX design, digital marketing, SEO, AI solutions
   - Our technology stack: React, Next.js, Node.js, MongoDB, FastAPI, Python
   - Our projects, portfolio, and work examples
   - Pricing and service inquiries for Vyanwebs
   - Contact information and support

2. You MUST REFUSE and NOT answer questions about:
   - Sports (IPL, cricket, football, etc.)
   - Movies, entertainment, actors
   - Politics, government, news, weather
   - Cryptocurrencies, stocks, finance
   - Gaming, personal advice, relationships
   - General tech education (What is Docker? How to deploy? etc.)
   - Any topic unrelated to Vyanwebs

3. For ANY unrelated question, respond EXACTLY with:
   "I can only assist with Vyanwebs-related services and company information. Please contact our team at +91 9111721315 or email info@vyanwebs.com."

4. Never generate fake information about Vyanwebs.

5. If information is unavailable, say: "I don't have that information. Please contact us at +91 9111721315 or info@vyanwebs.com."

============================================

Company Details:
- Company: Vyanwebs Pvt Ltd
- Services: Web Development, App Development, UI/UX Design, DevOps Engineering, Digital Transformation, Mobile Development, Data Engineering, Software Testing & QA
- Tech Stack: React, Next.js, Node.js, Express, MongoDB, FastAPI, Python, Tailwind CSS
- Contact: info@vyanwebs.com, hr@vyanwebs.com, +91 9111721315
- Tone: helpful, professional, human-like

Answer clearly and briefly. Ask clarification questions if needed, but ONLY for Vyanwebs-related inquiries."""

GROUND_TRUTH_FACTS = [
    (
        ["who are you", "about", "company", "vyanwebs"],
        (
            "Vyanwebs Pvt Ltd is a digital product and software company that provides "
            "end-to-end software solutions. We work across the full cycle from concept, "
            "design, development, and testing to launch support."
        ),
    ),
    (
        ["service", "services", "what do you offer", "what can you do"],
        (
            "We offer Web Development, Software Development, UI/UX Design, DevOps Engineering, "
            "Digital Transformation, Mobile Development, Data Engineering, and Software Testing & QA."
        ),
    ),
    (
        [
            "web development",
            "website",
            "wordpress",
            "api development",
            "responsive",
            "microservices",
        ],
        (
            "Our web development work includes responsive websites, backend systems, WordPress sites, "
            "mobile optimization, API development, conversion rate optimization, AWS/Azure hosting, "
            "SQL and NoSQL databases, and microservices-based solutions."
        ),
    ),
    (
        ["pricing", "price", "cost", "quote", "budget", "estimate"],
        (
            "Pricing depends on the project scope. Share your goal, required features, timeline, and budget, "
            "and we can give a more accurate estimate."
        ),
    ),
    (
        ["contact", "reach", "call", "email", "whatsapp", "phone"],
        (
            "You can contact us at info@vyanwebs.com, hr@vyanwebs.com, or +91 9111721315. "
            "You can also reach us on WhatsApp at +91 9111721315."
        ),
    ),
    (
        ["career", "careers", "job", "jobs", "hiring", "resume", "hr"],
        "We’re always looking for talented people. Send your resume to hr@vyanwebs.com.",
    ),
    (
        ["work", "portfolio", "project", "case study", "clients"],
        (
            "We’ve worked with 500+ clients across different industries. If you tell me the type of project you need, "
            "I can share the most relevant work examples."
        ),
    ),
]

# Fixed answers for short factual queries (do not hallucinate)
FIXED_ANSWERS = {
    "project_count": {
        "keywords": [
            "project count",
            "how many projects",
            "projects completed",
            "projects delivered",
        ],
        "answer": "We have successfully delivered 500+ projects to clients across industries.",
    },
    "founder": {
        "keywords": ["founder", "who founded", "who is the founder", "founder's name"],
        "answer": "I don't have the founder's personal details. Please contact info@vyanwebs.com for official details.",
    },
    "owner": {
        "keywords": ["owner", "company owner", "who owns vyanwebs"],
        "answer": "For ownership information, please contact info@vyanwebs.com.",
    },
    "pricing": {
        "keywords": ["pricing", "price", "cost", "quote", "estimate"],
        "answer": (
            "Our pricing depends on project features, complexity, and timeline. "
            "Please share: (1) key features, (2) target platforms (web/mobile), "
            "(3) expected timeline, (4) any third-party integrations, and (5) your budget range. "
            "With these details we can provide an accurate estimate."
        ),
    },
    "office": {
        "keywords": [
            "office",
            "address",
            "location",
            "where are you located",
            "office address",
        ],
        "answer": "Our main office is in India. For the exact address or to schedule a visit, please contact info@vyanwebs.com.",
    },
    "contact": {
        "keywords": ["contact", "reach", "call", "email", "phone", "whatsapp"],
        "answer": "You can contact us at info@vyanwebs.com, hr@vyanwebs.com, or +91 9111721315.",
    },
    "technologies": {
        "keywords": [
            "technologies",
            "tech stack",
            "stack",
            "technologies you use",
            "what tech",
        ],
        "answer": "We use React, Next.js, Node.js, Express, MongoDB, FastAPI, Python, and Tailwind CSS among other modern tools.",
    },
}

# RAG-related keywords — queries that should prefer retrieval from site docs
RAG_KEYWORDS = [
    "faq",
    "faqs",
    "frequently asked",
    "blog",
    "blogs",
    "detailed services",
    "service details",
    "portfolio explanation",
    "portfolio details",
    "feature",
    "features",
    "feature explanation",
    "case study details",
]


def is_rag_query(message: str) -> bool:
    lower_msg = message.lower()
    return any(_contains_word(lower_msg, kw) for kw in RAG_KEYWORDS)


def retrieve_rag_context(message: str) -> list[str]:
    """Stub for retrieval — returns a list of relevant document snippets.

    TODO: Implement actual retriever that indexes site/blogs/FAQs and returns
    ranked passages. For now this acts as a placeholder to be extended.
    """
    # Placeholder: no documents indexed yet
    return []


# Prompt templates
PRICING_PROMPT = (
    "Our pricing depends on project features, complexity, and timeline. "
    "Please share: (1) key features, (2) target platforms (web/mobile), "
    "(3) expected timeline, (4) any third-party integrations, and (5) your budget range. "
    "With these details we can provide an accurate estimate."
)

PROJECT_SHARE_PROMPT = (
    "Sure — please share your project details. Helpful items to include: "
    "project goal, core features, target users, preferred platforms (web / iOS / Android), "
    "design expectations (UI/UX), integrations (APIs, payments), timeline, and budget. "
    "You can paste the brief here and we’ll guide the next steps."
)

# Keywords for detecting unrelated questions (sports, movies, crypto, general tech education, etc.)
UNRELATED_KEYWORDS = [
    # Sports
    "ipl",
    "cricket",
    "football",
    "soccer",
    "nfl",
    "nba",
    "basketball",
    "tennis",
    "sport",
    "match",
    "game",
    "win",
    "won",
    "player",
    # Movies/Entertainment
    "movie",
    "film",
    "actor",
    "actress",
    "bollywood",
    "hollywood",
    "series",
    "show",
    "netflix",
    "imdb",
    # Politics/News
    "politics",
    "politician",
    "election",
    "vote",
    "government",
    "minister",
    "parliament",
    "news",
    "weather",
    "climate",
    # Celebrities
    "celebrity",
    "celebrity",
    "star",
    "famous",
    "celebrity gossip",
    # Cryptocurrency/Finance
    "bitcoin",
    "crypto",
    "cryptocurrency",
    "ethereum",
    "blockchain",
    "forex",
    "stock market",
    "share price",
    # Gaming
    "gaming",
    "game",
    "ps5",
    "xbox",
    "fortnite",
    "pubg",
    # Personal advice
    "personal advice",
    "relationship",
    "love",
    "health",
    "medical",
    "diet",
    "exercise",
    # Social media trends
    "tiktok",
    "instagram",
    "facebook",
    "twitter",
    "social media",
    "trend",
    "viral",
    # General tech/education (when not specifically about Vyanwebs services)
    "docker",
    "kubernetes",
    "linux",
    "ubuntu",
    "terminal",
    "command line",
    "ssh",
    "sql injection",
    "database design",
    "algorithm",
    "data structure",
    "operating system",
    "compiler",
    "interpreter",
    "api design",
    "rest api",
    "graphql",
    "websocket",
    "tutorial",
    "course",
    "certification",
    "exam",
    "deployment",
    "devops",
    "ci cd",
    "github actions",
    "jenkins",
    "terraform",
    "ansible",
    "docker compose",
    "microservices",
    "serverless",
    "cloud computing",
    "aws",
    "azure",
    "gcp",
    "machine learning",
    "deep learning",
    "neural network",
    "tensorflow",
    "pytorch",
    "scikit learn",
    "data science",
    "big data",
    "hadoop",
    "spark",
    "education",
    "learn",
    "course",
]

# Keywords that indicate educational/general questions
EDUCATIONAL_KEYWORDS = [
    "what is",
    "what are",
    "how to",
    "how do",
    "explain",
    "teach",
    "tutorial",
    "guide",
    "example",
    "difference between",
    "define",
]


@dataclass(frozen=True)
class Settings:
    groq_api_key: str
    groq_model: str
    owner_email: str
    allowed_origins: list[str]
    smtp_host: str | None
    smtp_port: int
    smtp_username: str | None
    smtp_password: str | None
    smtp_from: str
    smtp_use_tls: bool
    company_founded: str | None


_groq_client = None


def init_groq_client(api_key: str) -> None:
    """Initialize the Groq client once at startup."""
    global _groq_client
    if not _groq_client:
        _groq_client = Groq(api_key=api_key)
        print(f"✓ Groq client initialized successfully")


def get_groq_client():
    """Get the singleton Groq client instance."""
    global _groq_client
    if _groq_client is None:
        raise RuntimeError(
            "Groq client not initialized. Call init_groq_client() first."
        )
    return _groq_client


def load_settings() -> Settings:
    load_dotenv(Path(__file__).resolve().parents[1] / ".env", override=False)

    allowed_origins = [
        origin.strip()
        for origin in os.getenv(
            "ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173"
        ).split(",")
        if origin.strip()
    ]

    return Settings(
        groq_api_key=os.getenv("GROQ_API_KEY", "").strip(),
        groq_model=os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile").strip(),
        owner_email=os.getenv("OWNER_EMAIL", "info@vyanwebs.com").strip(),
        allowed_origins=allowed_origins,
        smtp_host=os.getenv("SMTP_HOST", "").strip() or None,
        smtp_port=int(os.getenv("SMTP_PORT", "587")),
        smtp_username=os.getenv("SMTP_USERNAME", "").strip() or None,
        smtp_password=os.getenv("SMTP_PASSWORD", "").strip() or None,
        smtp_from=os.getenv(
            "SMTP_FROM", "Vyanwebs Chatbot <no-reply@vyanwebs.com>"
        ).strip(),
        smtp_use_tls=os.getenv("SMTP_USE_TLS", "true").lower()
        in {"1", "true", "yes", "on"},
        company_founded=os.getenv("COMPANY_FOUNDED", "").strip() or None,
    )


def _contains_word(text: str, word: str) -> bool:
    """Return True if `word` appears as a whole word or phrase in `text`.

    Uses regex word boundaries to avoid accidental substring matches.
    """
    return bool(re.search(r"\b" + re.escape(word) + r"\b", text))


def is_unrelated_question(message: str) -> bool:
    """Check if the question is ONLY related to Vyanwebs services.

    Returns True (BLOCK) if:
    1. Message contains keywords about sports, movies, politics, crypto, gaming, etc.
    2. Message is a general educational question (what is X, how to X) that's NOT about Vyanwebs

    Returns False (ALLOW) ONLY if:
    - Question asks directly about Vyanwebs, our services, our tech, or our projects
    """
    lower_msg = message.lower()

    # ALLOW if explicitly about Vyanwebs services/company
    vyanwebs_keywords = [
        "vyanweb",
        "vyanwebs",
        "your service",
        "your company",
        "your technology",
        "your tech stack",
        "your project",
        "your work",
        "your portfolio",
        "your team",
        "your pricing",
        "your process",
        "build for me",
        "develop for me",
        "create for me",
        "help me build",
        "help me develop",
        "help me create",
        "do you offer",
        "can you build",
        "can you develop",
        "can you create",
        "do you work with",
        "do you use",
    ]

    has_vyanwebs_keyword = any(
        _contains_word(lower_msg, keyword) for keyword in vyanwebs_keywords
    )

    # ALLOW if asking about our Vyanwebs-specific tech stack
    vyanwebs_tech_stack = [
        "react",
        "next.js",
        "node.js",
        "express",
        "mongodb",
        "fastapi",
        "python",
    ]

    has_vyanwebs_tech = any(
        _contains_word(lower_msg, keyword) for keyword in vyanwebs_tech_stack
    )

    # BLOCK: Direct unrelated keywords (sports, movies, politics, crypto, gaming, personal, etc.)
    if any(_contains_word(lower_msg, keyword) for keyword in UNRELATED_KEYWORDS):
        return True

    # BLOCK: General educational questions UNLESS they mention Vyanwebs or our services
    has_educational_keyword = any(
        _contains_word(lower_msg, keyword) for keyword in EDUCATIONAL_KEYWORDS
    )

    # Special-case: career/contact related questions should be allowed even if
    # the user didn't mention "Vyanwebs" explicitly (e.g., "How do I apply for a job?")
    career_contact_keywords = [
        "career",
        "careers",
        "job",
        "jobs",
        "hiring",
        "resume",
        "apply",
        "application",
        "hr",
    ]
    if any(_contains_word(lower_msg, kw) for kw in career_contact_keywords):
        return False

    if has_educational_keyword:
        # If it's an educational question, ONLY ALLOW if explicitly about Vyanwebs
        if not has_vyanwebs_keyword and not has_vyanwebs_tech:
            return True  # BLOCK general educational questions

    return False  # ALLOW: It's about Vyanwebs


def generate_reference_id(session_id: str | None = None) -> str:
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
    suffix = session_id.strip() if session_id else "guest"
    return f"CHAT-{timestamp}-{suffix[:24]}"


def build_prompt(message: str, user_name: str | None = None) -> str:
    name_line = f"User name: {user_name}\n" if user_name else ""
    return f"{SYSTEM_PROMPT}\n{name_line}User message: {message.strip()}"


def answer_from_ground_truth(
    message: str, company_founded: str | None = None
) -> str | None:
    lower_msg = message.lower()

    # Check fixed answers first (highest priority)
    for key, entry in FIXED_ANSWERS.items():
        if any(_contains_word(lower_msg, kw) for kw in entry.get("keywords", [])):
            return entry.get("answer")

    # If the user asks specifically when the company was founded/established,
    # prefer returning the explicit founding info if available; otherwise
    # return a short, contact-oriented reply.
    if (
        _contains_word(lower_msg, "vyanweb") or _contains_word(lower_msg, "vyanwebs")
    ) and any(
        _contains_word(lower_msg, kw)
        for kw in ["when", "establish", "established", "founded", "found"]
    ):
        if company_founded:
            return f"Vyanwebs Pvt Ltd was established in {company_founded}."
        return (
            "I don't have the company's founding date in the site details. "
            "You can contact info@vyanwebs.com for that information."
        )

    # If user wants to share project details, invite them to provide a brief
    if any(
        _contains_word(lower_msg, kw)
        for kw in [
            "share my project",
            "share project",
            "tell you about my project",
            "i want to share",
            "i want to discuss",
            "i want to tell you",
        ]
    ):
        return PROJECT_SHARE_PROMPT

    # If the user asks about pricing, ask for project requirements/features first
    if any(
        _contains_word(lower_msg, kw)
        for kw in ["pricing", "price", "cost", "quote", "estimate"]
    ):
        return PRICING_PROMPT

    for keywords, answer in GROUND_TRUTH_FACTS:
        if any(_contains_word(lower_msg, keyword) for keyword in keywords):
            return answer

    return None


def should_use_model(message: str) -> bool:
    lower_msg = message.lower()
    return not any(
        _contains_word(lower_msg, keyword)
        for keyword in [
            "about",
            "service",
            "services",
            "web development",
            "pricing",
            "price",
            "cost",
            "quote",
            "contact",
            "reach",
            "call",
            "email",
            "whatsapp",
            "career",
            "careers",
            "job",
            "jobs",
            "hiring",
            "resume",
            "resume",
            "portfolio",
            "project",
            "case study",
            "clients",
        ]
    )


def is_vyanwebs_related(message: str) -> bool:
    """Check if the question is clearly about Vyanwebs services/company.

    Returns True ONLY if message explicitly mentions:
    - Vyanwebs, build, develop, app, website, chatbot
    - Our tech stack: React, Next.js, Node.js, MongoDB, FastAPI, Python
    """
    lower_msg = message.lower()
    vyanwebs_keywords = [
        "vyanweb",
        "vyanwebs",
        "build",
        "develop",
        "create",
        "app",
        "website",
        "application",
        "software",
        "solution",
        "chatbot",
        "ai solution",
        "service",
        "support",
        "help",
        "consult",
        "quote",
        "pricing",
        "project",
        "career",
        "careers",
        "job",
        "jobs",
        "hiring",
        "resume",
        "hr",
    ]
    vyanwebs_tech = [
        "react",
        "next.js",
        "node.js",
        "express",
        "mongodb",
        "fastapi",
        "python",
    ]
    return any(
        _contains_word(lower_msg, kw) for kw in vyanwebs_keywords + vyanwebs_tech
    )


def build_fallback_reply(message: str, company_founded: str | None = None) -> str:
    lower_msg = message.lower()

    # If the user asks when the company was founded, prefer the env value if present.
    if (
        _contains_word(lower_msg, "vyanweb") or _contains_word(lower_msg, "vyanwebs")
    ) and any(
        _contains_word(lower_msg, kw)
        for kw in ["when", "establish", "established", "founded", "found"]
    ):
        if company_founded:
            return f"Vyanwebs Pvt Ltd was established in {company_founded}."
        return (
            "I don't have the company's founding date in the site details. "
            "You can contact info@vyanwebs.com for that information."
        )

    if any(_contains_word(lower_msg, keyword) for keyword in ["hello", "hi", "hey"]):
        return "Hi there! Welcome to Vyanwebs. How can I assist you?"

    if any(
        _contains_word(lower_msg, keyword)
        for keyword in [
            "about vyanweb",
            "about vyanwebs",
            "tell me about",
            "who are you",
            "what is vyanweb",
            "what is vyanwebs",
            "company",
            "vyanweb",
            "vyanwebs",
        ]
    ):
        return (
            "Vyanwebs is a digital product and software company focused on web development, "
            "app development, UI/UX, digital marketing, SEO, AI chatbots, and automation. "
            "We build practical, business-focused solutions and work closely with clients to "
            "turn ideas into scalable products."
        )

    if _contains_word(lower_msg, "service"):
        return (
            "We offer Web Development, App Development, Digital Marketing, SEO, "
            "and AI Chatbots. Tell us what you need and we’ll point you to the right service."
        )

    if any(
        _contains_word(lower_msg, keyword)
        for keyword in ["price", "cost", "quote", "budget"]
    ):
        return (
            "Pricing depends on the project scope. Share a few details about your goal, "
            "and we’ll help you with the right estimate."
        )

    if any(
        _contains_word(lower_msg, keyword)
        for keyword in ["contact", "reach", "call", "email"]
    ):
        return "You can reach us at +91 9111721315 or email info@vyanwebs.com."

    if any(
        _contains_word(lower_msg, keyword)
        for keyword in ["work", "portfolio", "project", "case study"]
    ):
        return (
            "We’ve worked with 500+ clients across different industries. I can share "
            "relevant work examples if you tell me the type of project you need."
        )

    if any(
        _contains_word(lower_msg, keyword)
        for keyword in ["career", "job", "hiring", "resume"]
    ):
        return "We’re always looking for talented people. Send your resume to hr@vyanwebs.com."

    return (
        "Thanks for your message. Please share a little more detail so we can help you "
        "with the right solution."
    )


def generate_gemini_reply(
    message: str, settings: Settings, user_name: str | None = None
) -> str:
    # HIGHEST PRIORITY: Block unrelated questions before any API call
    if is_unrelated_question(message):
        return "I can only assist with Vyanwebs-related services and company information. Please contact our team at +91 9111721315 or email info@vyanwebs.com."

    grounded_answer = answer_from_ground_truth(
        message, company_founded=settings.company_founded
    )
    if grounded_answer:
        return grounded_answer

    # If this looks like a RAG query, attempt to retrieve supporting documents
    rag_docs = []
    if is_rag_query(message):
        rag_docs = retrieve_rag_context(message)
        # If we found relevant docs, include them in the system prompt to ground the model
        if rag_docs:
            rag_text = "\n\n--- Relevant Documents ---\n" + "\n\n".join(rag_docs)
            # prepend documents to system prompt for grounding
            augmented_system = SYSTEM_PROMPT + "\n" + rag_text
        else:
            augmented_system = SYSTEM_PROMPT
    else:
        augmented_system = SYSTEM_PROMPT

    if not should_use_model(message):
        return build_fallback_reply(message, company_founded=settings.company_founded)

    # Block API call if NOT clearly Vyanwebs-related
    if not is_vyanwebs_related(message):
        return "I can only assist with Vyanwebs-related services and company information. Please contact our team at +91 9111721315 or email info@vyanwebs.com."

    max_retries = 3
    retry_delay = 1

    for attempt in range(max_retries):
        try:
            client = get_groq_client()
            response = client.chat.completions.create(
                model=settings.groq_model,
                messages=[
                    {
                        "role": "system",
                        "content": augmented_system,
                    },
                    {
                        "role": "user",
                        "content": build_prompt(message, user_name=user_name),
                    },
                ],
                temperature=0.1,
                top_p=0.9,
                max_tokens=256,
            )

            text = (response.choices[0].message.content or "").strip()
            if not text:
                text = "I’m not fully sure from the available site details. Please share a little more context so I can answer accurately."
            return text
        except Exception as exc:
            if "429" in str(exc) and attempt < max_retries - 1:
                wait_time = retry_delay * (2**attempt)  # Exponential backoff
                print(
                    f"Rate limited. Retrying in {wait_time}s (attempt {attempt + 1}/{max_retries})"
                )
                time.sleep(wait_time)
            else:
                raise


def stream_gemini_reply(message: str, settings: Settings, user_name: str | None = None):
    # HIGHEST PRIORITY: Block unrelated questions before any API call
    if is_unrelated_question(message):
        yield "I can only assist with Vyanwebs-related services and company information. Please contact our team at +91 9111721315 or email info@vyanwebs.com."
        return

    grounded_answer = answer_from_ground_truth(
        message, company_founded=settings.company_founded
    )
    if grounded_answer:
        yield grounded_answer
        return

    if not should_use_model(message):
        yield build_fallback_reply(message, company_founded=settings.company_founded)
        return

    # Block API call if NOT clearly Vyanwebs-related
    if not is_vyanwebs_related(message):
        yield "I can only assist with Vyanwebs-related services and company information. Please contact our team at +91 9111721315 or email info@vyanwebs.com."
        return

    # If this looks like a RAG query, attempt to retrieve supporting documents
    rag_docs = []
    if is_rag_query(message):
        rag_docs = retrieve_rag_context(message)
        if rag_docs:
            rag_text = "\n\n--- Relevant Documents ---\n" + "\n\n".join(rag_docs)
            augmented_system = SYSTEM_PROMPT + "\n" + rag_text
        else:
            augmented_system = SYSTEM_PROMPT
    else:
        augmented_system = SYSTEM_PROMPT

    max_retries = 3
    retry_delay = 1

    for attempt in range(max_retries):
        try:
            client = get_groq_client()
            response = client.chat.completions.create(
                model=settings.groq_model,
                messages=[
                    {
                        "role": "system",
                        "content": augmented_system,
                    },
                    {
                        "role": "user",
                        "content": build_prompt(message, user_name=user_name),
                    },
                ],
                temperature=0.1,
                top_p=0.9,
                max_tokens=256,
                stream=True,
            )

            for chunk in response:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
            break  # Success, exit retry loop
        except Exception as exc:
            if "429" in str(exc) and attempt < max_retries - 1:
                wait_time = retry_delay * (2**attempt)  # Exponential backoff
                print(
                    f"Rate limited. Retrying in {wait_time}s (attempt {attempt + 1}/{max_retries})"
                )
                time.sleep(wait_time)
            else:
                raise


def _format_email_html(payload: dict[str, Any]) -> str:
    conversation = payload.get("conversation") or []

    if conversation:
        conversation_rows = "".join(
            f"<tr><td style='padding:8px 12px;border:1px solid #d1d5db;background:#f9fafb;font-weight:600;vertical-align:top;'>Turn {index + 1}</td>"
            f"<td style='padding:8px 12px;border:1px solid #d1d5db;white-space:pre-wrap;'>"
            f"<div><strong>User:</strong> {turn.get('message') or '-'}</div>"
            f"<div style='margin-top:8px;'><strong>Bot:</strong> {turn.get('reply') or '-'}</div>"
            f"<div style='margin-top:8px;color:#6b7280;font-size:12px;'>Time: {turn.get('created_at') or '-'}</div>"
            f"</td></tr>"
            for index, turn in enumerate(conversation)
        )
    else:
        conversation_rows = "".join(
            f"<tr><td style='padding:8px 12px;border:1px solid #d1d5db;background:#f9fafb;font-weight:600;vertical-align:top;'>{row['label']}</td>"
            f"<td style='padding:8px 12px;border:1px solid #d1d5db;white-space:pre-wrap;'>{row['value']}</td></tr>"
            for row in [
                {"label": "Reference ID", "value": payload["reference_id"]},
                {"label": "Session ID", "value": payload.get("session_id") or "-"},
                {"label": "Name", "value": payload.get("user_name") or "-"},
                {"label": "Email", "value": payload.get("user_email") or "-"},
                {"label": "Page URL", "value": payload.get("page_url") or "-"},
                {"label": "User Message", "value": payload["message"]},
                {"label": "Bot Reply", "value": payload["reply"]},
                {"label": "Created At", "value": payload["created_at"]},
            ]
        )

    return f"""
    <html>
      <body style="font-family:Arial,sans-serif;background:#f3f4f6;margin:0;padding:24px;">
        <div style="max-width:760px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:linear-gradient(90deg,#2563eb,#0ea5e9);color:#ffffff;padding:20px 24px;">
            <h2 style="margin:0;font-size:22px;">New chatbot conversation</h2>
            <p style="margin:8px 0 0;font-size:14px;opacity:0.95;">A visitor used the Vyanwebs assistant.</p>
          </div>
          <div style="padding:24px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:#111827;">
              {conversation_rows}
            </table>
          </div>
        </div>
      </body>
    </html>
    """


def _format_email_text(payload: dict[str, Any]) -> str:
    conversation = payload.get("conversation") or []

    if conversation:
        lines = [
            "New chatbot session",
            f"Reference ID: {payload['reference_id']}",
            f"Session ID: {payload.get('session_id') or '-'}",
            f"Name: {payload.get('user_name') or '-'}",
            f"Email: {payload.get('user_email') or '-'}",
            f"Page URL: {payload.get('page_url') or '-'}",
            f"Turn Count: {len(conversation)}",
            "",
        ]
        for index, turn in enumerate(conversation, start=1):
            lines.extend(
                [
                    f"Turn {index}",
                    f"User: {turn.get('message') or '-'}",
                    f"Bot: {turn.get('reply') or '-'}",
                    f"Time: {turn.get('created_at') or '-'}",
                    "",
                ]
            )
        return "\n".join(lines)

    return "\n".join(
        [
            "New chatbot conversation",
            f"Reference ID: {payload['reference_id']}",
            f"Session ID: {payload.get('session_id') or '-'}",
            f"Name: {payload.get('user_name') or '-'}",
            f"Email: {payload.get('user_email') or '-'}",
            f"Page URL: {payload.get('page_url') or '-'}",
            f"User Message: {payload['message']}",
            f"Bot Reply: {payload['reply']}",
            f"Created At: {payload['created_at']}",
        ]
    )


def send_owner_email(payload: dict[str, Any], settings: Settings) -> None:
    if (
        not settings.smtp_host
        or not settings.smtp_username
        or not settings.smtp_password
    ):
        return

    msg = EmailMessage()
    subject_prefix = (
        "[Vyanwebs Chatbot Session]"
        if payload.get("conversation")
        else "[Vyanwebs Chatbot]"
    )
    msg["Subject"] = f"{subject_prefix} {payload['reference_id']}"
    msg["From"] = settings.smtp_from
    msg["To"] = settings.owner_email
    msg.set_content(_format_email_text(payload))
    msg.add_alternative(_format_email_html(payload), subtype="html")

    context = ssl.create_default_context()
    with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=20) as server:
        if settings.smtp_use_tls:
            server.starttls(context=context)
        server.login(settings.smtp_username, settings.smtp_password)
        server.send_message(msg)
