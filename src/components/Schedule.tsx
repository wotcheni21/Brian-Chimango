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
            description="A gentle guide through the ceremony, luncheon, photography and evening celebration."
          />
        </RevealOnScroll>

        <ol className="mt-16 flex flex-col">
          {schedule.map((item, index) => (
            <RevealOnScroll key={`${item.time}-${item.title}`} delayMs={index * 70}>
              <li
                className={`group relative flex gap-6 border-t py-7 first:border-t-0 sm:gap-10 ${
                  item.highlighted
                    ? "my-2 rounded-2xl border border-mint/45 bg-ivory/10 px-5 shadow-lg shadow-ink/15 first:border-t sm:px-7"
                    : "border-ivory/15"
                }`}
              >
                <div className="flex w-20 shrink-0 flex-col items-start sm:w-28">
                  <span
                    className={`font-serif text-2xl sm:text-3xl ${
                      item.highlighted ? "font-bold text-gilt" : "text-mint"
                    }`}
                  >
                    {item.time}
                  </span>
                </div>
                <div className="relative flex flex-1 flex-col gap-1 pb-1">
                  <span
                    className={`absolute -left-[calc(1.5rem+5px)] top-2 hidden rounded-full bg-mint sm:-left-[calc(2.5rem+5px)] sm:block ${
                      item.highlighted ? "h-3.5 w-3.5 ring-4 ring-mint/20" : "h-2.5 w-2.5"
                    }`}
                  />
                  <h3
                    className={`font-serif text-xl text-ivory sm:text-2xl ${
                      item.highlighted ? "font-bold" : ""
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-fog/80 sm:text-base">
                      {item.description}
                    </p>
                  )}
                  {item.details && (
                    <ul className="mt-4 grid gap-2 text-sm text-fog/75 sm:grid-cols-2">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint/80" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
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
