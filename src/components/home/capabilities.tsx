import { Eyebrow } from "../ui";

const capabilities = [
  {
    number: "3.1",
    title: "Go-to-market",
    body: "Positioning, brand, launch plans and paid acquisition. Pear Analytics has run Google Ads, SEO and analytics programs since 2008.",
    items: ["Brand and positioning", "Google Ads and paid social", "SEO and AI visibility", "Launch plans"],
  },
  {
    number: "3.2",
    title: "AI and software",
    body: "Production applications built in-house. AI where it earns its place, with guardrails: the math runs in code and the model writes the words.",
    items: ["Web and mobile apps", "AI features and agents", "Integrations and data pipelines", "Admin and reporting portals"],
  },
  {
    number: "3.3",
    title: "Operations",
    body: "The systems a company runs on: CRM and automation, analytics, customer reporting, hosting and security monitoring.",
    items: ["CRM and marketing automation", "Analytics and dashboards", "Hosting and security", "Customer reporting"],
  },
  {
    number: "3.4",
    title: "Shared back office",
    body: "Company setup, shared tools and the infrastructure every PearTree company runs on, so a new venture doesn't start from zero.",
    items: ["Company setup", "Shared CRM and hosting", "Brand and web standards"],
  },
];

export function Capabilities() {
  return (
    <section id="approach" className="gutter section-y">
      <div className="shell flex flex-col gap-12">
        <div className="flex max-w-[820px] flex-col gap-5">
          <Eyebrow>03 · What we bring</Eyebrow>
          <h2 className="m-0 text-display-lg font-bold stretch-118">One team behind every launch</h2>
          <p className="m-0 text-lg leading-[1.6] text-body">
            The same people who run marketing for Pear Analytics clients build the software and run the operations
            for PearTree companies. You get the whole bench, not a referral list.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] border-t border-ink">
          {capabilities.map((capability) => (
            <div key={capability.number} className="flex flex-col gap-4 border-b border-rule py-7 pr-6">
              <div className="font-mono text-xs text-muted">{capability.number}</div>
              <h3 className="m-0 text-[22px] font-bold stretch-115">{capability.title}</h3>
              <p className="m-0 text-base leading-[1.6] text-body">{capability.body}</p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0 font-mono text-[13px] text-bark">
                {capability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-baseline gap-x-16 gap-y-6 pt-10">
          <p className="m-0 flex-[1_1_420px] text-[clamp(32px,4vw,52px)] font-[750] leading-[1.02] tracking-[-0.015em] stretch-122">
            AI-first.
            <br />
            No vibe coding.
          </p>
          <p className="m-0 flex-[1_1_460px] text-lg leading-[1.6] text-body">
            We use AI to move faster, not to skip the engineering. Every app we ship is reviewed, tested and owned by
            people who will still be answering for it next year.
          </p>
        </div>
      </div>
    </section>
  );
}
