import csv
import io
import os

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, StreamingResponse

from .auth import require_admin
from .database import get_connection, init_db
from .schemas import RsvpCreate, RsvpOut, RsvpSummary

app = FastAPI(title="Brian & Chimango RSVP API", version="1.0.0")

allowed_origins = [
    origin.strip()
    for origin in os.environ.get("RSVP_ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins or ["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/rsvp", status_code=status.HTTP_201_CREATED)
def create_rsvp(payload: RsvpCreate) -> dict:
    with get_connection() as conn:
        conn.execute(
            """
            INSERT INTO rsvps (full_name, phone, email, attendance, guests, message)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                payload.full_name,
                payload.phone,
                payload.email,
                payload.attendance,
                payload.guests,
                payload.message,
            ),
        )
    return {"ok": True}


@app.get("/rsvp", response_model=list[RsvpOut], dependencies=[Depends(require_admin)])
def list_rsvps() -> list[dict]:
    with get_connection() as conn:
        rows = conn.execute(
            "SELECT * FROM rsvps ORDER BY created_at DESC"
        ).fetchall()
    return [dict(row) for row in rows]


@app.get("/rsvp/summary", response_model=RsvpSummary, dependencies=[Depends(require_admin)])
def rsvp_summary() -> dict:
    with get_connection() as conn:
        rows = conn.execute("SELECT attendance, guests FROM rsvps").fetchall()

    attending = [r for r in rows if r["attendance"] == "attending"]
    not_attending = [r for r in rows if r["attendance"] == "not_attending"]

    return {
        "total_responses": len(rows),
        "attending": len(attending),
        "not_attending": len(not_attending),
        "total_guests_attending": sum(r["guests"] for r in attending),
    }


@app.get("/rsvp/export.csv", dependencies=[Depends(require_admin)])
def export_csv() -> StreamingResponse:
    with get_connection() as conn:
        rows = conn.execute(
            "SELECT * FROM rsvps ORDER BY created_at DESC"
        ).fetchall()

    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["id", "full_name", "phone", "email", "attendance", "guests", "message", "created_at"])
    for row in rows:
        writer.writerow(
            [row["id"], row["full_name"], row["phone"], row["email"], row["attendance"], row["guests"], row["message"] or "", row["created_at"]]
        )
    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=rsvp-list.csv"},
    )


@app.get("/admin", response_class=HTMLResponse)
def admin_page(token: str | None = None) -> str:
    """A no-dependency HTML page for viewing the RSVP list in a browser.
    Visit /admin?token=YOUR_ADMIN_TOKEN — the token is only used client-side
    to call the JSON endpoints below, it is never persisted server-side here."""
    if not token:
        return "<p style='font-family: sans-serif; padding: 2rem;'>Append <code>?token=YOUR_ADMIN_TOKEN</code> to the URL.</p>"

    return f"""
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>RSVP List — Brian &amp; Chimango</title>
      <style>
        body {{ font-family: -apple-system, Segoe UI, sans-serif; background: #f7f5ef; color: #2c2e2c; margin: 0; padding: 2rem; }}
        h1 {{ font-size: 1.4rem; }}
        table {{ width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }}
        th, td {{ text-align: left; padding: 0.6rem 0.9rem; border-bottom: 1px solid #ece9e1; font-size: 0.9rem; }}
        th {{ background: #344c3d; color: #fff; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.05em; }}
        .summary {{ display: flex; gap: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }}
        .card {{ background: #fff; border-radius: 10px; padding: 0.8rem 1.2rem; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }}
        .card b {{ display: block; font-size: 1.4rem; }}
        a.export {{ display: inline-block; margin-bottom: 1rem; color: #344c3d; }}
      </style>
    </head>
    <body>
      <h1>RSVP List — Brian &amp; Chimango</h1>
      <div class="summary" id="summary"></div>
      <a class="export" href="/rsvp/export.csv?token={token}">Download CSV &rarr;</a>
      <table>
        <thead>
          <tr><th>Name</th><th>Phone</th><th>Email</th><th>Attendance</th><th>Guests</th><th>Message</th><th>Submitted</th></tr>
        </thead>
        <tbody id="rows"></tbody>
      </table>
      <script>
        const token = {token!r};
        async function load() {{
          const [rsvps, summary] = await Promise.all([
            fetch(`/rsvp?token=${{token}}`).then(r => r.json()),
            fetch(`/rsvp/summary?token=${{token}}`).then(r => r.json()),
          ]);

          document.getElementById('summary').innerHTML = `
            <div class="card"><b>${{summary.total_responses}}</b>Responses</div>
            <div class="card"><b>${{summary.attending}}</b>Attending</div>
            <div class="card"><b>${{summary.not_attending}}</b>Not attending</div>
            <div class="card"><b>${{summary.total_guests_attending}}</b>Guests attending</div>
          `;

          document.getElementById('rows').innerHTML = rsvps.map(r => `
            <tr>
              <td>${{r.full_name}}</td>
              <td>${{r.phone}}</td>
              <td>${{r.email}}</td>
              <td>${{r.attendance}}</td>
              <td>${{r.guests}}</td>
              <td>${{r.message || ''}}</td>
              <td>${{r.created_at}}</td>
            </tr>
          `).join('');
        }}
        load();
      </script>
    </body>
    </html>
    """
