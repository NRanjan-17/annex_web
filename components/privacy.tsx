const FACTS = [
  { title: "Encrypted end to end", body: "TLS 1.3 over QUIC, with both computers proving who they are." },
  { title: "Paired with a PIN", body: "The PIN is never sent (SPAKE2), and paired computers remember each other's keys." },
  { title: "Local stays local", body: "On your own network, Annex never talks to a server." },
  { title: "Codes only introduce", body: "Over the internet, our server swaps two addresses. It never sees your screen." },
];

/** One floating glass panel over a faint light: the only glass on the page. */
export function Privacy() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 max-w-3xl -translate-y-1/2 rounded-full bg-white/[0.07] blur-[120px]"
      />
      <div className="relative grid gap-10 rounded-[28px] bg-white/[0.04] p-8 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1),inset_0_1px_0_rgb(255_255_255/0.12),0_40px_80px_-40px_rgb(0_0_0)] backdrop-blur-2xl md:grid-cols-[1fr_1.1fr] md:p-12">
        <div>
          <p className="eyebrow">Privacy</p>
          <h2 id="privacy-title" className="mt-3 text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            Your screen goes from one computer to the other. Nowhere else.
          </h2>
          <p className="mt-5 text-[15px] leading-6 text-dim">
            No accounts, no ads, no tracking, no cloud copy of anything. Annex is open source, so anyone can check.
          </p>
        </div>
        <ul className="divide-y divide-white/[0.07] self-center">
          {FACTS.map((f) => (
            <li key={f.title} className="py-4 first:pt-0 last:pb-0">
              <p className="text-[15px] font-semibold">{f.title}</p>
              <p className="mt-1 text-[15px] leading-6 text-dim">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
