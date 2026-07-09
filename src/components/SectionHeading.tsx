type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  align = "center",
  tone = "dark",
  description,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const eyebrowColor = tone === "dark" ? "text-moss" : "text-mint";
  const titleColor = tone === "dark" ? "text-ink" : "text-ivory";
  const descColor = tone === "dark" ? "text-graphite" : "text-fog";

  return (
    <div className={`flex flex-col ${alignClass} gap-4`}>
      <span
        className={`ornament text-xs uppercase tracking-[0.35em] ${eyebrowColor}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`font-serif text-4xl sm:text-5xl md:text-6xl ${titleColor} text-balance leading-[1.05]`}
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-xl text-base sm:text-lg ${descColor} leading-relaxed`}>
          {description}
        </p>
      )}
    </div>
  );
}
