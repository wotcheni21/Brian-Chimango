import os
import secrets

from fastapi import HTTPException, Query, Request, status

ADMIN_TOKEN = os.environ.get("RSVP_ADMIN_TOKEN")


def require_admin(request: Request, token: str | None = Query(default=None)) -> None:
    """Accepts the admin token either as `Authorization: Bearer <token>`
    or as a `?token=` query param (so the admin list can be opened directly
    in a browser)."""
    if not ADMIN_TOKEN:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            "RSVP_ADMIN_TOKEN is not configured on the server.",
        )

    header = request.headers.get("authorization", "")
    header_token = header.removeprefix("Bearer ").strip() if header else None
    supplied = header_token or token

    if not supplied or not secrets.compare_digest(supplied, ADMIN_TOKEN):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or missing admin token.")
