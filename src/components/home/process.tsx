import { SectionHeader } from "../ui";

const steps = [
  {
    title: "Fit call",
    body: "A conversation about the market, the customer and what you've already tried. No deck required.",
  },
  {
    title: "Prototype",
    body: "We build a working prototype, so both sides decide on something real instead of a slide.",
  },
  {
    title: "Terms",
    body: "Costs, revenue, ownership and IP, agreed in writing before the full build begins.",
  },
  {
    title: "Build and launch",
    body: "Our team runs product, marketing and operations alongside yours, and we keep going after launch day.",
  },
];

export function Process() {
  return (
    <section className="gutter section-y">
      <div className="shell flex flex-col gap-12">
        <SectionHeader eyebrow="05 · Process" title="From first call to launch" />

        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-8 p-0">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={
                index === steps.length - 1
                  ? "flex flex-col gap-3.5 border-t-2 border-gold pt-5"
                  : "flex flex-col gap-3.5 border-t-2 border-ink pt-5"
              }
            >
              <span className="font-mono text-sm text-muted">Step {String(index + 1).padStart(2, "0")}</span>
              <span className="text-[22px] font-bold stretch-115">{step.title}</span>
              <span className="text-base leading-[1.6] text-body">{step.body}</span>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5 pt-6">
          <div className="flex flex-col gap-[18px] rounded-xs border border-rule bg-card p-8">
            <h3 className="m-0 text-[22px] font-bold stretch-115">A good fit if</h3>
            <ul className="m-0 flex list-disc flex-col gap-3 pl-5 text-base leading-[1.55] text-body">
              <li>
                You&apos;ve spent years in an industry and can see a problem that software or better marketing would
                fix
              </li>
              <li>You have customers, an audience, or a way to reach them</li>
              <li>You want a partner with something at stake, not a vendor</li>
            </ul>
          </div>
          <div className="flex flex-col gap-[18px] rounded-xs border border-rule p-8">
            <h3 className="m-0 text-[22px] font-bold stretch-115">Probably not a fit if</h3>
            <ul className="m-0 flex list-disc flex-col gap-3 pl-5 text-base leading-[1.55] text-body">
              <li>
                You need a website or an ad campaign on a set budget.{" "}
                <a href="https://pearanalytics.com">Pear Analytics</a> or{" "}
                <a href="https://pyrusdigitalmedia.com">Pyrus Digital Media</a> can help.
              </li>
              <li>You&apos;re raising money and only want investors</li>
              <li>No one on your side knows the customer yet</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
