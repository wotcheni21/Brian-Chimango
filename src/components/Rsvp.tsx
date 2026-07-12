import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import BestWishesForm from "./BestWishesForm";
import RsvpForm from "./RsvpForm";
import { rsvpContacts } from "@/lib/wedding-data";

function toTelHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

function toWhatsappHref(phone: string) {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
}

export default function Rsvp() {
  return (
    <section id="rsvp" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="absolute inset-0 opacity-[0.14]">
        <Image
          src="/images/couple-doorway-close.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Kindly Reply"
            title="RSVP"
            tone="light"
            description="Please respond by 26 July 2026 so we can prepare a seat, a plate and a toast just for you."
          />
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <RevealOnScroll>
            <div className="rounded-[2rem] bg-paper p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] sm:p-10">
              <RsvpForm />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={140}>
            <aside className="flex h-full flex-col gap-8 rounded-[2rem] border border-ivory/15 bg-ivory/5 p-8 backdrop-blur-sm sm:p-10">
              <BestWishesForm embedded />

              <div className="h-px bg-ivory/15" />

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <span className="text-xs uppercase tracking-[0.3em] text-mint">
                    Prefer to reach out directly?
                  </span>
                  <p className="text-sm leading-relaxed text-fog/85">
                    Our RSVP coordinators are happy to help by phone or
                    WhatsApp if you&apos;d rather not use the form.
                  </p>
                </div>

                <ul className="flex flex-col gap-5">
                  {rsvpContacts.map((contact) => (
                    <li
                      key={contact.phone}
                      className="flex flex-col gap-3 rounded-2xl border border-ivory/15 p-5"
                    >
                      <div className="flex flex-col">
                        <span className="font-serif text-lg text-ivory">
                          {contact.name}
                        </span>
                        <span className="text-sm text-fog/80">{contact.phone}</span>
                      </div>
                      <div className="flex gap-3 text-xs uppercase tracking-[0.2em]">
                        <a
                          href={toTelHref(contact.phone)}
                          className="rounded-full border border-mint/60 px-4 py-2 text-mint transition-colors hover:bg-mint hover:text-evergreen"
                        >
                          Call
                        </a>
                        <a
                          href={toWhatsappHref(contact.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-mint/60 px-4 py-2 text-mint transition-colors hover:bg-mint hover:text-evergreen"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
