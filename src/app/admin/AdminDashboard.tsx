"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type RsvpRow = {
  id: number;
  wedding_slug: string;
  full_name: string;
  phone: string;
  email: string;
  attendance: "attending" | "not_attending";
  guests: number;
  message: string | null;
  created_at: string;
};

type RsvpSummary = {
  total_responses: number;
  attending: number;
  not_attending: number;
  total_guests_attending: number;
};

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "loaded"; rows: RsvpRow[]; summary: RsvpSummary }
  | { status: "error"; message: string };

const API_URL = "/api/rsvp";
const WEDDING_SLUG = process.env.NEXT_PUBLIC_WEDDING_SLUG ?? "brian-chimango";

function TokenForm({ token }: { token: string }) {
  const router = useRouter();
  const [manualToken, setManualToken] = useState(token);

  const handleTokenSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = manualToken.trim();
    if (trimmed) {
      router.push(`/admin?token=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <section className="rounded-[1.4rem] border border-evergreen/10 bg-paper/90 p-6 shadow-[0_20px_60px_rgba(44,46,44,0.08)]">
      <h2 className="font-serif text-3xl text-ink">Enter admin token</h2>
      <p className="mt-2 text-sm leading-6 text-graphite">
        This page reads the RSVP API using your admin token. For local and
        production access, use{" "}
        <code className="rounded bg-fog px-1.5 py-0.5">august26</code>.
      </p>
      <form onSubmit={handleTokenSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="password"
          value={manualToken}
          onChange={(event) => setManualToken(event.target.value)}
          placeholder="Admin token"
          className="min-h-12 flex-1 rounded-xl border border-mist bg-white/80 px-4 text-ink outline-none focus:border-evergreen focus:ring-2 focus:ring-sage/40"
        />
        <button className="min-h-12 rounded-full bg-evergreen px-6 text-xs font-bold uppercase tracking-[0.16em] text-ivory">
          Open List
        </button>
      </form>
    </section>
  );
}

function formatTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" & ");
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function attendanceLabel(value: RsvpRow["attendance"]) {
  return value === "attending" ? "Attending" : "Not attending";
}

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [state, setState] = useState<LoadState>({ status: "idle" });

  const baseApiUrl = useMemo(() => API_URL?.replace(/\/$/, ""), []);
  const weddingTitle = formatTitle(WEDDING_SLUG);
  const exportUrl =
    baseApiUrl && token
      ? `${baseApiUrl}/weddings/${WEDDING_SLUG}/rsvp/export.csv?token=${encodeURIComponent(token)}`
      : "#";

  useEffect(() => {
    if (!baseApiUrl || !token) {
      return;
    }

    let cancelled = false;

    async function load() {
      setState({ status: "loading" });

      try {
        const [rowsResponse, summaryResponse] = await Promise.all([
          fetch(
            `${baseApiUrl}/weddings/${WEDDING_SLUG}/rsvp?token=${encodeURIComponent(token)}`,
            { cache: "no-store" }
          ),
          fetch(
            `${baseApiUrl}/weddings/${WEDDING_SLUG}/rsvp/summary?token=${encodeURIComponent(token)}`,
            { cache: "no-store" }
          ),
        ]);

        if (!rowsResponse.ok || !summaryResponse.ok) {
          throw new Error("Could not load RSVP data. Check the token and try again.");
        }

        const [rows, summary] = (await Promise.all([
          rowsResponse.json(),
          summaryResponse.json(),
        ])) as [RsvpRow[], RsvpSummary];

        if (!cancelled) {
          setState({ status: "loaded", rows, summary });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Could not load RSVP data. Check the API server.",
          });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [baseApiUrl, token]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(183,155,107,0.20),transparent_30rem),linear-gradient(135deg,#fbfaf6_0%,#f7f5ef_42%,#e4e9df_100%)] px-4 py-6 text-ink sm:px-6 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-[1.4rem] border border-evergreen/10 bg-paper/85 p-6 shadow-[0_30px_90px_rgba(44,46,44,0.12)] backdrop-blur md:flex md:items-end md:justify-between md:gap-8 md:p-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-moss">
              Wedding RSVP Admin
            </p>
            <h1 className="font-serif text-4xl leading-none text-ink sm:text-6xl">
              {weddingTitle} RSVP List
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-graphite sm:text-base">
              View responses, guest totals, contact details and notes directly
              from the wedding frontend.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:justify-end">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-full border border-evergreen/25 bg-white/50 px-5 text-xs font-bold uppercase tracking-[0.14em] text-evergreen transition hover:-translate-y-0.5"
            >
              Site
            </Link>
            <a
              href={exportUrl}
              aria-disabled={!token || !baseApiUrl}
              className="inline-flex min-h-11 items-center rounded-full bg-evergreen px-5 text-xs font-bold uppercase tracking-[0.14em] text-ivory transition hover:-translate-y-0.5 aria-disabled:pointer-events-none aria-disabled:opacity-50"
            >
              Download CSV
            </a>
          </div>
        </section>

        {!token && (
          <TokenForm token={token} />
        )}

        {state.status === "loaded" && <SummaryCards summary={state.summary} />}

        <section className="overflow-hidden rounded-[1.4rem] border border-evergreen/10 bg-paper/90 shadow-[0_24px_70px_rgba(44,46,44,0.10)]">
          <div className="border-b border-fog px-5 py-5 sm:px-6">
            <h2 className="text-base font-bold text-ink">Responses</h2>
            <p className="mt-1 text-sm text-graphite">
              {state.status === "loaded"
                ? state.rows.length
                  ? `${state.rows.length} response${state.rows.length === 1 ? "" : "s"} loaded.`
                  : "No responses yet."
                : state.status === "loading"
                  ? "Loading RSVP responses..."
                  : "Open with an admin token to load responses."}
            </p>
          </div>

          {state.status === "error" && (
            <div className="p-8 text-center text-red-700">{state.message}</div>
          )}

          {state.status === "loading" && (
            <div className="p-8 text-center text-graphite">Loading responses...</div>
          )}

          {state.status === "loaded" && state.rows.length === 0 && (
            <div className="p-10 text-center text-graphite">
              No RSVPs have been submitted for this wedding yet.
            </div>
          )}

          {state.status === "loaded" && state.rows.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse">
                <thead className="bg-evergreen text-left text-[0.68rem] uppercase tracking-[0.14em] text-white">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Contact</th>
                    <th className="px-5 py-4">Attendance</th>
                    <th className="px-5 py-4">Guests</th>
                    <th className="px-5 py-4">Message</th>
                    <th className="px-5 py-4">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {state.rows.map((row) => (
                    <tr key={row.id} className="border-b border-fog last:border-0 hover:bg-sage-hint/50">
                      <td className="px-5 py-4 align-top">
                        <div className="font-bold text-ink">{row.full_name}</div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div>{row.phone}</div>
                        <div className="text-sm text-graphite">{row.email}</div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] ${
                            row.attendance === "attending"
                              ? "bg-sage-hint text-evergreen"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {attendanceLabel(row.attendance)}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top font-bold">{row.guests}</td>
                      <td className="max-w-xs px-5 py-4 align-top leading-6 text-charcoal">
                        {row.message || "No message"}
                      </td>
                      <td className="px-5 py-4 align-top text-sm text-graphite">
                        {formatDate(row.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function SummaryCards({ summary }: { summary: RsvpSummary }) {
  const cards = [
    {
      label: "Responses",
      value: summary.total_responses,
      hint: "Total replies received",
    },
    {
      label: "Attending",
      value: summary.attending,
      hint: "Confirmed yes",
    },
    {
      label: "Not attending",
      value: summary.not_attending,
      hint: "Unable to attend",
    },
    {
      label: "Guests",
      value: summary.total_guests_attending,
      hint: "Expected attendees",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative min-h-34 overflow-hidden rounded-[1.1rem] border border-evergreen/10 bg-paper/90 p-5 shadow-[0_18px_50px_rgba(44,46,44,0.09)]"
        >
          <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-sage/15" />
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-graphite">
            {card.label}
          </div>
          <div className="mt-5 font-serif text-5xl leading-none text-evergreen">
            {card.value}
          </div>
          <div className="mt-3 text-sm text-graphite">{card.hint}</div>
        </div>
      ))}
    </section>
  );
}
