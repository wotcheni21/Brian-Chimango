import { NextRequest } from "next/server";

const DEFAULT_RSVP_API_URL = "http://75.119.141.13";
const MIN_GUESTS = 1;
const MAX_GUESTS = 3;

function getBackendUrl() {
  return (process.env.RSVP_API_URL ?? DEFAULT_RSVP_API_URL).replace(/\/$/, "");
}

function validateRsvpBody(path: string[], bodyText: string) {
  if (path.at(-1) !== "rsvp") {
    return null;
  }

  try {
    const body = JSON.parse(bodyText) as { guests?: unknown };
    const guests = Number(body.guests);

    if (
      !Number.isInteger(guests) ||
      guests < MIN_GUESTS ||
      guests > MAX_GUESTS
    ) {
      return Response.json(
        { error: "Guest count must be between 1 and 3." },
        { status: 400 }
      );
    }
  } catch {
    return Response.json({ error: "Invalid RSVP payload." }, { status: 400 });
  }

  return null;
}

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const targetUrl = new URL(`${getBackendUrl()}/${path.join("/")}`);
  targetUrl.search = request.nextUrl.search;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const bodyText =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text();

  if (request.method === "POST" && bodyText !== undefined) {
    const validationResponse = validateRsvpBody(path, bodyText);
    if (validationResponse) {
      return validationResponse;
    }
  }

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: bodyText,
    cache: "no-store",
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}
