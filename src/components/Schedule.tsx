import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { schedule } from "@/lib/wedding-data";

export default function Schedule() {
  return (
    <section id="schedule" className="bg-evergreen py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Order of Events"
            title="How the day unfolds"
            tone="light"
            description="A gentle guide to the day — timings are approximate and will be finalised closer to the date."
          />
        </RevealOnScroll>

        <ol className="mt-16 flex flex-col">
          {schedule.map((item, index) => (
            <RevealOnScroll key={item.time} delayMs={index * 70}>
              <li className="group relative flex gap-6 border-t border-ivory/15 py-7 first:border-t-0 sm:gap-10">
                <div className="flex w-20 shrink-0 flex-col items-start sm:w-28">
                  <span className="font-serif text-2xl text-mint sm:text-3xl">
                    {item.time}
                  </span>
                </div>
                <div className="relative flex flex-1 flex-col gap-1 pb-1">
                  <span className="absolute -left-[calc(1.5rem+5px)] top-2 hidden h-2.5 w-2.5 rounded-full bg-mint sm:-left-[calc(2.5rem+5px)] sm:block" />
                  <h3 className="font-serif text-xl text-ivory sm:text-2xl">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-fog/80 sm:text-base">
                      {item.description}
                    </p>
                  )}
                </div>
              </li>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  );
}
