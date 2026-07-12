import type { RsvpResult, WeddingWishPayload } from "@/types/rsvp";

const RSVP_API_URL = "/api/rsvp";
const WEDDING_SLUG = process.env.NEXT_PUBLIC_WEDDING_SLUG ?? "brian-chimango";

export async function sendWeddingWish(
  payload: WeddingWishPayload
): Promise<RsvpResult> {
  try {
    const response = await fetch(
      `${RSVP_API_URL}/weddings/${WEDDING_SLUG}/wishes`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      return {
        ok: false,
        error: "Your message could not be sent right now. Please try again shortly.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network error - please check your connection and try again.",
    };
  }
}
