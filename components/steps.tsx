import { Section } from "./section";

const STEPS = [
  { title: "Install Annex on both", body: "Download it for each computer, or paste one line in a terminal. It keeps itself up to date." },
  { title: "Turn on sharing", body: "On the computer whose screen you'll use, switch on Share. The other one sees it under Nearby." },
  { title: "Pick Extend or Mirror", body: "Choose the computer, then Extend or Show its screen. Type the PIN the first time." },
];

export function Steps() {
  return (
    <Section id="how" label="How it works" title="Three steps. The first is the longest.">
      <ol className="grid gap-3 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="group-surface p-6">
            <span className="grid size-8 place-items-center rounded-full bg-white text-sm font-semibold tabular-nums text-black">{i + 1}</span>
            <h3 className="mt-8 text-[17px] font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-1.5 text-[15px] leading-6 text-dim">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
