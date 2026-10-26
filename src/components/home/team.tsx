import { team } from "@/content/site";
import { Eyebrow } from "../ui";

export function Team() {
  return (
    <section id="team" className="gutter section-y border-t border-rule">
      <div className="shell flex flex-wrap gap-12">
        <div className="flex flex-[1_1_420px] flex-col gap-5">
          <Eyebrow>06 · Who we are</Eyebrow>
          <h2 className="m-0 text-display-lg font-bold stretch-118">Run by operators</h2>
          <p className="m-0 text-lg leading-[1.6] text-body">
            PearTree is run by the people who built Pear Analytics. We still do the work ourselves.
          </p>
        </div>
        <div className="grid flex-[1_1_640px] grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
          {team.map((person) => (
            <div key={person.name} className="flex flex-col gap-4 rounded-xs border border-rule bg-card p-7">
              <div
                aria-hidden="true"
                className={`flex size-[72px] items-center justify-center rounded-full text-2xl font-bold text-paper stretch-118 ${
                  person.tone === "ink" ? "bg-ink" : "bg-bark"
                }`}
              >
                {person.initials}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[22px] font-bold stretch-115">{person.name}</span>
                <span className="font-mono text-[13px] text-muted">{person.role}</span>
              </div>
              <p className="m-0 text-base leading-[1.6] text-body">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
