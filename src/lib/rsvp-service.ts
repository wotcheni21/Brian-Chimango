import type { RsvpPayload, RsvpResult } from "@/types/rsvp";

// Set NEXT_PUBLIC_RSVP_API_URL in the environment to point this at the real
// backend (e.g. a Python + SQLite API on a VPS). Until then, submissions are
// handled by submitRsvpMock so the form remains fully testable.
const RSVP_API_URL = process.env.NEXT_PUBLIC_RSVP_API_URL;
const WEDDING_SLUG = process.env.NEXT_PUBLIC_WEDDING_SLUG ?? "brian-chimango";

async function submitRsvpMock(payload: RsvpPayload): Promise<RsvpResult> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (process.env.NODE_ENV !== "production") {
    console.info("[RSVP mock submission]", payload);
  }

  return { ok: true };
}

async function submitRsvpRemote(
  payload: RsvpPayload,
  apiUrl: string
): Promise<RsvpResult> {
  try {
    const response = await fetch(
      `${apiUrl.replace(/\/$/, "")}/weddings/${WEDDING_SLUG}/rsvp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      return { ok: false, error: "The RSVP service could not be reached. Please try again shortly." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error — please check your connection and try again." };
  }
}

export async function submitRsvp(payload: RsvpPayload): Promise<RsvpResult> {
  if (RSVP_API_URL) {
    return submitRsvpRemote(payload, RSVP_API_URL);
  }
  return submitRsvpMock(payload);
}
