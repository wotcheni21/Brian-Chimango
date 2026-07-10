import type { RsvpPayload, RsvpResult } from "@/types/rsvp";

const RSVP_API_URL = "/api/rsvp";
const WEDDING_SLUG = process.env.NEXT_PUBLIC_WEDDING_SLUG ?? "brian-chimango";

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
  return submitRsvpRemote(payload, RSVP_API_URL);
}
