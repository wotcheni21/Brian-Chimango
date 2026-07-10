"use client";

import { useEffect, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import { weddingDate } from "@/lib/wedding-data";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(
    0,
    new Date(weddingDate.iso).getTime() - Date.now()
  );
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-mist bg-paper shadow-[0_20px_40px_-28px_rgba(44,46,44,0.5)] sm:h-28 sm:w-28">
        <span className="font-serif text-3xl text-evergreen tabular-nums sm:text-5xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-[0.3em] text-graphite sm:text-xs">
        {label}
      </span>
    </div>
  );
}

const ZERO: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export default function Countdown() {
  // Starts at zero and syncs to the real value on mount only, so the
  // server-rendered markup (no access to "now") matches client hydration.
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(ZERO);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial client-only sync with real clock, required to avoid SSR/client mismatch
    setTimeLeft(getTimeLeft());
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-sage-hint py-20 sm:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-6 text-center sm:px-10">
        <RevealOnScroll>
          <span className="ornament text-xs uppercase tracking-[0.35em] text-moss">
            Counting down to
          </span>
          <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
            {weddingDate.display}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <div
            className="grid grid-cols-2 gap-4 sm:flex sm:gap-8"
            role="timer"
            aria-live="polite"
            aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds until the wedding`}
          >
            <Unit value={timeLeft.days} label="Days" />
            <Unit value={timeLeft.hours} label="Hours" />
            <Unit value={timeLeft.minutes} label="Minutes" />
            <Unit value={timeLeft.seconds} label="Seconds" />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
