from __future__ import annotations

from typing import Literal, Optional
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    session_id: Optional[str] = Field(default=None, max_length=120)
    user_name: Optional[str] = Field(default=None, max_length=120)
    user_email: Optional[str] = Field(default=None, max_length=254)
    page_url: Optional[str] = Field(default=None, max_length=2000)


class ChatResponse(BaseModel):
    reply: str
    reference_id: str
    email_status: Literal["queued", "skipped", "failed"]
    model: str
