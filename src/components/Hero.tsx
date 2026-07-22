import Image from "next/image";
import { couple, heroMessage, weddingDate } from "@/lib/wedding-data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      <Image
        src="/images/couple-doorway-full.jpg"
        alt="Brian and Chimango dressed elegantly in black, arriving together at a doorway"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_15%] opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/20" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 pt-40 sm:px-10 sm:pb-28">
        <p className="animate-fade-in text-xs uppercase tracking-[0.5em] text-mint">
          We&apos;re getting married
        </p>

        <h1 className="animate-fade-up font-serif text-6xl leading-[0.95] text-ivory text-balance sm:text-8xl md:text-9xl">
          {couple.partnerOne}
          <span className="mx-3 italic text-gilt sm:mx-5">&amp;</span>
          {couple.partnerTwo}
        </h1>

        <div
          className="animate-fade-up flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          style={{ animationDelay: "200ms" }}
        >
          <div className="flex flex-col gap-3">
            <span className="ornament text-sm uppercase tracking-[0.35em] text-fog">
              {weddingDate.display}
            </span>
            <p className="max-w-xl text-base leading-relaxed text-fog/90 sm:text-lg">
              {heroMessage}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#rsvp"
              className="rounded-full bg-evergreen px-8 py-3.5 text-xs uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-moss"
            >
              RSVP
            </a>
            <a
              href="#details"
              className="rounded-full border border-ivory/70 px-8 py-3.5 text-xs uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-ivory hover:text-evergreen"
            >
              Our Day
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/70 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-ivory/60" />
      </div>
    </section>
  );
}
