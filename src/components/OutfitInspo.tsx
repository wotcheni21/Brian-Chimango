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
  const lightTone =
    audience === "For men"
      ? swatches[swatches.length - 1].color
      : swatches[0].color;
  const deepTone =
    swatches.find((swatch) => swatch.label === "Evergreen")?.color ??
    swatches[0].color;
  const accentTone =
    swatches.find((swatch) => swatch.label === "Gold")?.color ??
    swatches[Math.floor(swatches.length / 2)].color;

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-mist bg-paper p-6 shadow-[0_28px_70px_-42px_rgba(44,46,44,0.5)] sm:p-8">
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-2xl"
        style={{ backgroundColor: `${lightTone}59` }}
        aria-hidden
      />

      <div className="relative">
        <span className="text-[11px] uppercase tracking-[0.34em] text-moss">
          {audience}
        </span>
        <h3 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite sm:text-base">
          {description}
        </p>
      </div>

      <div
        className="relative mt-7 overflow-hidden rounded-[1.5rem] border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-7"
        style={{
          borderColor: `${deepTone}2e`,
          background: `radial-gradient(circle at 12% 12%, ${lightTone}8c 0%, transparent 42%), radial-gradient(circle at 88% 88%, ${deepTone}40 0%, transparent 48%), linear-gradient(135deg, #fbfaf6 12%, ${accentTone}38 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-10 bottom-2 h-12 rounded-full blur-2xl"
          style={{ backgroundColor: `${deepTone}24` }}
          aria-hidden
        />
        <div className="relative mx-auto aspect-[7/5] w-full max-w-[420px]">
          <Image
            src={image}
            alt={title}
            fill
            unoptimized
            sizes="(min-width: 1024px) 20vw, 70vw"
            className="object-contain mix-blend-multiply"
          />
        </div>
      </div>

      <div className="mt-7 border-t border-mist/80 pt-6">
        <span className="text-[10px] uppercase tracking-[0.28em] text-graphite/70">
          Palette shades
        </span>
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {swatches.map((swatch) => (
            <div
              key={swatch.label}
              className="flex min-w-0 items-center gap-2.5 rounded-full border border-mist/80 bg-ivory/80 px-3 py-2"
            >
              <span
                className="h-6 w-6 shrink-0 rounded-full border border-ink/10"
                style={{ backgroundColor: swatch.color }}
                aria-hidden
              />
              <span className="truncate text-[10px] uppercase tracking-[0.1em] text-graphite">
                {swatch.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
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
