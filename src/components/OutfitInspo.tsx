import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { outfitInspo, outfitPalettes } from "@/lib/wedding-data";

function PaletteCard({
  audience,
  title,
  description,
  image,
  swatches,
}: {
  audience: string;
  title: string;
  description: string;
  image: string;
  swatches: { label: string; color: string }[];
}) {
  return (
    <div className="grid h-full min-h-[520px] overflow-hidden rounded-[1.75rem] border border-mist bg-paper shadow-[0_24px_60px_-38px_rgba(44,46,44,0.45)] sm:grid-cols-2">
      <div className="flex min-h-[300px] items-center justify-center bg-ivory px-7 py-8">
        <div className="relative aspect-[2/3] h-full max-h-[380px] w-full max-w-[220px]">
          <Image
            src={image}
            alt={title}
            fill
            unoptimized
            sizes="(min-width: 1024px) 20vw, 70vw"
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex min-h-[300px] flex-col px-6 py-8 sm:px-8">
        <span className="text-xs uppercase tracking-[0.32em] text-moss">
          {audience}
        </span>
        <h3 className="mt-5 min-h-[5.5rem] font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {title}
        </h3>
        <p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-graphite sm:text-base">
          {description}
        </p>
        <div className="mt-auto grid grid-cols-1 gap-3 pt-7 sm:grid-cols-2">
          {swatches.map((swatch) => (
            <div key={swatch.label} className="flex items-center gap-2">
              <span
                className="h-8 w-8 shrink-0 rounded-full border border-ink/10"
                style={{ backgroundColor: swatch.color }}
                aria-hidden
              />
              <span className="text-xs uppercase tracking-[0.18em] text-graphite">
                {swatch.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OutfitCard({
  label,
  note,
  image,
}: {
  label: string;
  note?: string;
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

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-ink/85 to-transparent p-5">
        <span className="font-serif text-lg text-ivory sm:text-xl">
          {label}
        </span>
        {note && <span className="text-xs leading-relaxed text-fog">{note}</span>}
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
            description="For men, grey tones. For ladies, sage green finished with gold accessories."
          />
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          {outfitPalettes.map((palette, index) => (
            <RevealOnScroll
              key={palette.title}
              className="h-full"
              delayMs={index * 120}
            >
              <PaletteCard {...palette} />
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {outfitInspo.map((item, index) => (
            <RevealOnScroll key={item.label} delayMs={index * 80}>
              <OutfitCard
                label={item.label}
                note={item.note}
                image={item.image}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
