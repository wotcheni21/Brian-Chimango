from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, Field, field_validator

AttendanceStatus = Literal["attending", "not_attending"]


class RsvpCreate(BaseModel):
    full_name: str = Field(min_length=1, max_length=200, alias="fullName")
    phone: str = Field(min_length=6, max_length=32)
    email: EmailStr
    attendance: AttendanceStatus
    guests: int = Field(ge=1, le=10)
    message: Optional[str] = Field(default=None, max_length=2000)

    model_config = {"populate_by_name": True}

    @field_validator("full_name", "phone")
    @classmethod
    def not_blank(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("must not be blank")
        return value


class RsvpOut(BaseModel):
    id: int
    full_name: str
    phone: str
    email: str
    attendance: AttendanceStatus
    guests: int
    message: Optional[str]
    created_at: datetime


class RsvpSummary(BaseModel):
    total_responses: int
    attending: int
    not_attending: int
    total_guests_attending: int
