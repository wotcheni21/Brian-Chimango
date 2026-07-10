import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { outfitInspo } from "@/lib/wedding-data";

function OutfitCard({
  label,
  image,
}: {
  label: string;
  image?: string;
}) {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-mist/70 bg-fog">
      {image ? (
        <Image
          src={image}
          alt={label}
          fill
          unoptimized
          loading="eager"
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-sage-hint via-fog to-mist/70 px-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-moss/40 text-moss">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M9 3h6l1 3 4 1-2 4 2 9H5l2-9-2-4 4-1 1-3Z" />
            </svg>
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-graphite">
            Image coming soon
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-ink/80 to-transparent p-5">
        <span className="font-serif text-lg text-ivory sm:text-xl">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function OutfitInspo() {
  return (
    <section id="outfit" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Outfit Inspiration"
            title="What to wear"
            description="Think tailored, timeless, and in step with our sage, charcoal, ivory and evergreen palette."
          />
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {outfitInspo.map((item, index) => (
            <RevealOnScroll key={item.label} delayMs={index * 80}>
              <OutfitCard label={item.label} image={item.image} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
