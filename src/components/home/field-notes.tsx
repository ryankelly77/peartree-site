import NextLink from "next/link";
import { SectionHeader } from "../ui";

const notes = [
  {
    kicker: "EDIAGD · Partnership · Automotive",
    title: "A coach's playbook, turned into a daily habit",
    body: "Mitch Hardt has coached dealership service advisors for [YEARS] years. We organized his library into a structured curriculum and built the app advisors open each morning: a stat, a coaching cue and a short video, with streaks and rewards that keep them coming back.",
    stats: [
      { value: "1,693", label: "coaching cues" },
      { value: "42", label: "courses" },
      { value: "253", label: "modules" },
    ],
  },
  {
    kicker: "Raptor Vending · Co-founded · Smart retail",
    title: "Vending that reports back to the building",
    body: "Raptor puts fresh meals, snacks and drinks in office and medical buildings. We built the brand, the website and the Raptor Portal, which sends every property manager an automated monthly report on what sold and what's next.",
    stats: [
      { value: "2", label: "buildings operating" },
      { value: "6", label: "more planned" },
      { value: "$0", label: "minimums for buildings" },
    ],
    link: { label: "Read the full story →", href: "/portfolio/raptor-vending" },
  },
];

export function FieldNotes() {
  return (
    <section className="gutter section-y border-y border-rule bg-sand">
      <div className="shell flex flex-col gap-12">
        <SectionHeader eyebrow="04 · Field notes" title="What partnership looks like" />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-5">
          {notes.map((note) => (
            <article
              key={note.title}
              className="flex flex-col gap-5 rounded-xs border border-rule bg-paper p-[clamp(24px,3vw,40px)]"
            >
              <div className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{note.kicker}</div>
              <h3 className="m-0 text-[clamp(26px,2.6vw,34px)] font-bold leading-[1.08] stretch-116">{note.title}</h3>
              <p className="m-0 text-[17px] leading-[1.65] text-body">{note.body}</p>
              <dl className="m-0 mt-auto grid grid-cols-3 border-t border-ink">
                {note.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse justify-end gap-1 pt-4 pr-3">
                    <dt className="text-[13px] text-muted">{stat.label}</dt>
                    <dd className="m-0 font-mono text-[clamp(24px,2.6vw,34px)] font-medium">{stat.value}</dd>
                  </div>
                ))}
              </dl>
              {note.link ? (
                <NextLink href={note.link.href} className="self-start py-3 font-semibold no-underline">
                  {note.link.label}
                </NextLink>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
