import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { gallery } from "@/lib/wedding-data";

function imageClass(monochrome?: boolean) {
  return `object-cover transition-transform duration-700 hover:scale-105 ${
    monochrome ? "grayscale contrast-110" : ""
  }`;
}

export default function Gallery() {
  const [featured, second, third, fourth, ...memories] = gallery.images;

  return (
    <section id="gallery" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Gallery"
            title="Moments so far"
            description="A few frames from the story that brought us here, including family memories in timeless black and white."
          />
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-6 sm:grid-rows-2">
          <RevealOnScroll className="sm:col-span-4 sm:row-span-2">
            <figure className="group relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] sm:aspect-auto sm:h-full">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                sizes="(min-width: 640px) 60vw, 100vw"
                className={imageClass(featured.monochrome)}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-6 pb-6 pt-16 font-serif text-2xl text-ivory">
                {featured.caption}
              </figcaption>
            </figure>
          </RevealOnScroll>

          {[second, third].map((image, index) => (
            <RevealOnScroll
              key={image.src}
              className="sm:col-span-2"
              delayMs={(index + 1) * 100}
            >
              <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-ink sm:h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 30vw, 100vw"
                  className={imageClass(image.monochrome)}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-5 pb-4 pt-12 text-sm uppercase tracking-[0.2em] text-ivory">
                  {image.caption}
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delayMs={260}>
          <figure className="mt-14 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-mint sm:h-28 sm:w-28">
              <Image
                src={fourth.src}
                alt={fourth.alt}
                fill
                sizes="112px"
                className={imageClass(fourth.monochrome)}
              />
            </div>
            <blockquote className="font-serif text-xl italic leading-snug text-ink sm:text-2xl">
              &ldquo;Every love story is beautiful, but ours is my favourite.&rdquo;
            </blockquote>
          </figure>
        </RevealOnScroll>

        {memories.length > 0 && (
          <div className="mt-16">
            <RevealOnScroll>
              <div className="flex flex-col gap-3 border-t border-mist pt-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-moss">
                    Family Album
                  </p>
                  <h3 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
                    Their journey in black and white
                  </h3>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-graphite">
                  These added memories are presented in monochrome so they sit
                  beautifully with the existing wedding theme.
                </p>
              </div>
            </RevealOnScroll>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {memories.map((image, index) => (
                <RevealOnScroll key={image.src} delayMs={index * 80}>
                  <figure className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ink shadow-[0_24px_50px_-30px_rgba(44,46,44,0.45)]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      className={imageClass(true)}
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-5 pb-5 pt-14 font-serif text-xl text-ivory">
                      {image.caption}
                    </figcaption>
                  </figure>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        )}

        <div className="relative mt-20 overflow-hidden rounded-[2.25rem] bg-evergreen px-5 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-mint/15"
            aria-hidden
          />
          <div
            className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-gilt/15"
            aria-hidden
          />

          <RevealOnScroll className="relative">
            <div className="flex max-w-3xl flex-col gap-4">
              <p className="text-xs uppercase tracking-[0.35em] text-mint">
                Family Milestones
              </p>
              <h3 className="font-serif text-4xl leading-tight text-ivory sm:text-5xl">
                The life and love they built
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-fog/85 sm:text-base">
                Through celebrations, achievements and everyday joys, family
                remains at the centre of their story.
              </p>
            </div>
          </RevealOnScroll>

          <div className="relative mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-start lg:gap-10">
            {gallery.familyHighlights.map((image, index) => (
              <RevealOnScroll
                key={image.src}
                className={index === 1 ? "sm:mt-20" : "sm:mr-6"}
                delayMs={(index + 1) * 120}
              >
                <figure className="group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-ivory/15 bg-ink shadow-[0_35px_70px_-30px_rgba(0,0,0,0.65)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 640px) 42vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-20 font-serif text-2xl leading-snug text-ivory sm:text-3xl">
                    {image.caption}
                  </figcaption>
                </figure>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
