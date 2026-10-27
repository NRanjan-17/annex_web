/** A page section with a small label and a heading, like the apps' grouped pages. */
export function Section({
  id,
  label,
  title,
  children,
  narrow = false,
}: {
  id?: string;
  label: string;
  title: string;
  children: React.ReactNode;
  /** A reading-width column (FAQ). */
  narrow?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={`mx-auto px-5 py-20 md:py-28 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>
      <p className="eyebrow">{label}</p>
      <h2 id={id ? `${id}-title` : undefined} className="mt-3 max-w-3xl text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
        {title}
      </h2>
      <div className="mt-12">{children}</div>
    </section>
  );
}
