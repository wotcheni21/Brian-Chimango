import os
import sqlite3
from contextlib import contextmanager
from pathlib import Path

DB_PATH = Path(os.environ.get("RSVP_DB_PATH", Path(__file__).resolve().parent.parent / "rsvp.db"))

SCHEMA = """
CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    attendance TEXT NOT NULL CHECK (attendance IN ('attending', 'not_attending')),
    guests INTEGER NOT NULL CHECK (guests BETWEEN 1 AND 10),
    message TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
"""


def init_db() -> None:
    with get_connection() as conn:
        conn.executescript(SCHEMA)


@contextmanager
def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()
