import { Section } from "./section";

const QUESTIONS = [
  { q: "Does it cost anything?", a: "No. Annex is free and open source under the MIT licence. There's no paid version and nothing to sign up for." },
  { q: "Do both computers need Annex?", a: "Yes: the one you're sitting at, and the one whose screen you want to use or extend." },
  {
    q: "Can I use it over the internet?",
    a: "Yes. On the sharing computer, get a code under This Mac or This PC, then type it on the other one. The screen goes straight between the two computers, encrypted.",
  },
  {
    q: "Will a plain USB cable work?",
    a: "Only a cable that makes a network link: Thunderbolt or USB4 between Macs, or Ethernet (with an adapter if needed) for everything else.",
  },
  {
    q: "What does Annex send to its servers?",
    a: "On your own network, nothing. With an internet code, our server only swaps the two computers' addresses. If a network blocks a direct link, our relay passes the session on, still encrypted: nothing is stored or seen. The only other request is the update check to GitHub, which you can turn off.",
  },
];

export function Faq() {
  return (
    <Section label="Questions" title="Good to know" narrow>
      <div className="group-surface divide-y divide-white/[0.07] px-6">
        {QUESTIONS.map(({ q, a }) => (
          <details key={q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium [&::-webkit-details-marker]:hidden">
              {q}
              <span aria-hidden="true" className="text-xl leading-none text-faint transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-6 text-dim">{a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
