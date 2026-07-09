import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { couple } from "@/lib/wedding-data";

export default function OurStory() {
  return (
    <section id="story" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20">
        <RevealOnScroll className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_rgba(44,46,44,0.35)] lg:max-w-none">
            <Image
              src="/images/couple-reception-portrait.jpg"
              alt="Brian and Chimango seated together at a candlelit table"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="order-1 lg:order-2" delayMs={120}>
          <SectionHeading
            eyebrow="Welcome"
            title="A love, gently unfolding"
            align="left"
          />
          <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-graphite sm:text-lg">
            <p>
              What began as quiet conversation grew, in time, into the kind of
              partnership that steadies a room — patient, warm, and entirely
              unhurried. {couple.partnerOne} and {couple.partnerTwo} have built
              a life together defined by small rituals and large kindnesses.
            </p>
            <p>
              Now, surrounded by the people who have shaped their story, they
              are ready to begin its next chapter. We would be honoured to
              have you there to witness it.
            </p>
          </div>
          <a
            href="#details"
            className="mt-10 inline-flex w-fit items-center gap-3 border-b border-evergreen pb-1 text-xs uppercase tracking-[0.3em] text-evergreen transition-colors hover:text-moss"
          >
            See the details
            <span aria-hidden>&rarr;</span>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
