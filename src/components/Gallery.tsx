import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { gallery } from "@/lib/wedding-data";

export default function Gallery() {
  const [featured, second, third, fourth] = gallery.images;

  return (
    <section id="gallery" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Gallery"
            title="Moments so far"
            description="A few frames from the story that brought us here."
          />
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-6 sm:grid-rows-2">
          <RevealOnScroll className="sm:col-span-4 sm:row-span-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] sm:aspect-auto sm:h-full">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                sizes="(min-width: 640px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="sm:col-span-2" delayMs={100}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] sm:h-full">
              <Image
                src={second.src}
                alt={second.alt}
                fill
                sizes="(min-width: 640px) 30vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="sm:col-span-2" delayMs={200}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-ink sm:h-full">
              <Image
                src={third.src}
                alt={third.alt}
                fill
                sizes="(min-width: 640px) 30vw, 100vw"
                className="object-cover grayscale transition-transform duration-700 hover:scale-105"
              />
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delayMs={260}>
          <figure className="mt-14 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-mint sm:h-28 sm:w-28">
              <Image
                src={fourth.src}
                alt={fourth.alt}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <blockquote className="font-serif text-xl italic leading-snug text-ink sm:text-2xl">
              &ldquo;Every love story is beautiful, but ours is my favourite.&rdquo;
            </blockquote>
          </figure>
        </RevealOnScroll>
      </div>
    </section>
  );
}
