import { couple, weddingDate } from "@/lib/wedding-data";

export default function Footer() {
  return (
    <footer className="bg-ink py-12 text-center">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 sm:px-10">
        <span className="font-serif text-2xl text-ivory">
          {couple.partnerOne} <span className="text-gilt">&amp;</span>{" "}
          {couple.partnerTwo}
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-fog/70">
          {weddingDate.display}
        </span>
        <span className="mt-4 text-xs text-fog/50">
          Made with love for our family and friends.
        </span>
      </div>
    </footer>
  );
}
