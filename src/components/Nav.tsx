"use client";

import { useEffect, useState } from "react";
import { couple } from "@/lib/wedding-data";

const links = [
  { href: "#story", label: "Our Story" },
  { href: "#details", label: "Details" },
  { href: "#schedule", label: "Schedule" },
  { href: "#gallery", label: "Gallery" },
  { href: "#outfit", label: "Outfit Inspo" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#top"
          className={`font-serif text-lg tracking-wide transition-colors ${
            scrolled || open ? "text-ink" : "text-ivory"
          }`}
        >
          {couple.partnerOne} <span className="text-gilt">&amp;</span> {couple.partnerTwo}
        </a>

        <ul className="hidden gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-xs uppercase tracking-[0.2em] transition-colors hover:text-moss ${
                  scrolled ? "text-charcoal" : "text-ivory"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#rsvp"
          className={`hidden rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-colors md:inline-block ${
            scrolled
              ? "border-evergreen text-evergreen hover:bg-evergreen hover:text-ivory"
              : "border-ivory text-ivory hover:bg-ivory hover:text-evergreen"
          }`}
        >
          RSVP
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-px w-6 transition-transform duration-300 ${
              scrolled || open ? "bg-ink" : "bg-ivory"
            } ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 transition-transform duration-300 ${
              scrolled || open ? "bg-ink" : "bg-ivory"
            } ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1 px-6 pb-8 pt-2 sm:px-10">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? undefined : -1}
                  className="block border-b border-mist/60 py-4 font-serif text-2xl text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-6">
              <a
                href="#rsvp"
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
                className="inline-block rounded-full bg-evergreen px-6 py-3 text-xs uppercase tracking-[0.2em] text-ivory"
              >
                RSVP Now
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
