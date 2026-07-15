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
        <div className="mt-5 flex flex-col items-center gap-2 border-t border-ivory/10 pt-5 text-xs text-fog/45">
          <span>Developed by Joseph Wotcheni</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a
              href="mailto:jwotcheni@gmail.com"
              className="transition-colors hover:text-mint"
            >
              jwotcheni@gmail.com
            </a>
            <a
              href="tel:+265883382263"
              className="transition-colors hover:text-mint"
            >
              +265883382263
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
