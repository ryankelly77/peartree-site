import type { Metadata } from "next";
import { InquirySection } from "@/components/inquiry-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Eyebrow, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "How we partner",
  description:
    "How PearTree Companies partners with founders and operators: who leads what, the deal structures we use, how ownership is set in writing, and how a deal comes together.",
  alternates: { canonical: "/partner" },
};

const heroFacts = [
  { label: "Who", value: "Founders, operators and companies with real industry expertise" },
  { label: "We bring", value: "Marketing, AI, software and operations" },
  { label: "We're paid by", value: "Shared revenue, equity, or a joint venture" },
  { label: "Based in", value: "San Antonio, Texas" },
];

type Owner = "you" | "us" | "shared";

const responsibilities: Array<{ area: string; owner: Owner; you?: string; us?: string; shared?: string }> = [
  { area: "Market knowledge", owner: "you", us: "Learns fast" },
  { area: "Customers and distribution", owner: "you", us: "Builds the funnel" },
  { area: "What the product does", owner: "shared" },
  { area: "Brand, website and launch", owner: "us", you: "Reviews" },
  { area: "Paid search, SEO and AI visibility", owner: "us", you: "Reviews" },
  { area: "Software and AI", owner: "us", you: "Tests with customers" },
  { area: "CRM, analytics and hosting", owner: "us", you: "Uses" },
  { area: "Hard costs", owner: "shared", shared: "Shared, per the agreement" },
  { area: "Big decisions", owner: "shared" },
];

const structures = [
  {
    label: "Structure 01",
    title: "Joint venture",
    body: "We form a new company together and share ownership. Best when the product is new and both sides are building from zero.",
    note: "In practice: EDIAGD",
  },
  {
    label: "Structure 02",
    title: "Revenue share",
    body: "You keep your company. We build and run a new product line for it and take a share of the revenue that line brings in. Best for established businesses adding a product.",
    note: "Good for: launching a product",
  },
  {
    label: "Structure 03",
    title: "Equity for go-to-market",
    body: "You have a product and no team to sell it. We run marketing and engineering in exchange for a stake in the company.",
    note: "Good for: selling an app",
  },
];

const ownership = [
  { title: "The code", body: "Who owns the software, the repositories and the infrastructure it runs on." },
  {
    title: "The content and know-how",
    body: "Your methods, training material and expertise stay yours unless we agree otherwise.",
  },
  { title: "The brand and the customers", body: "Who owns the name, the domain, the customer list and the data." },
  { title: "The way out", body: "What happens if either side wants to buy the other out, sell, or walk away." },
];

const dealSteps = [
  {
    title: "Fit call",
    body: "We talk through the market, the customer and what you've tried so far. Bring what you have. No deck required.",
    outcomeLabel: "You leave with",
    outcome:
      "A straight answer on whether we're the right partner. If we're not, we'll say so and point you somewhere better when we can.",
  },
  {
    title: "Prototype",
    body: "A fixed-scope build of the core idea, usually a paid engagement, so both sides have something real to judge.",
    outcomeLabel: "You leave with",
    outcome: "A working prototype you can put in front of customers, and a clear picture of what the full build takes.",
  },
  {
    title: "Terms",
    body: "An interim agreement that protects both sides, then a full partnership agreement reviewed by each side's attorney.",
    outcomeLabel: "You leave with",
    outcome: "Ownership, costs, revenue and IP settled before anyone writes production code.",
  },
  {
    title: "Build, launch, grow",
    body: "Our team runs product, marketing and operations alongside yours, and stays through growth, not just launch day.",
    outcomeLabel: "You get",
    outcome: "A roadmap, a launch plan, live marketing programs and a monthly report on how the company is doing.",
  },
];

const criteria = [
  { title: "Someone who knows the customer", body: "Years in the industry, not a weekend of research." },
  { title: "A market that pays", body: "Buyers with budget and a problem they already spend money on." },
  {
    title: "A reason we change the outcome",
    body: "Software, AI or marketing has to be the missing piece, not a nice extra.",
  },
  {
    title: "Years, not months",
    body: "We're building companies to keep or to sell well, so we want partners in it for the long run.",
  },
];

const faqs = [
  {
    question: "Do you invest cash?",
    answer:
      "Sometimes. Most of what we put in is our team, our tools and our marketing budget. On some deals we also share hard costs. We'll be specific before anything is signed.",
  },
  {
    question: "Can I just hire you to build it?",
    answer: (
      <>
        Yes. If you&apos;d rather own it outright, <a href="https://pearanalytics.com">Pear Analytics</a> builds custom
        AI applications as a client engagement. Partnership is for when you want us invested in the outcome.
      </>
    ),
  },
  {
    question: "I already have a developer or an agency. Does that rule us out?",
    answer:
      "No. We'll look at what exists and decide together what to keep, what to rebuild and who runs it from here.",
  },
  {
    question: "How long until launch?",
    answer: "It depends on the product. The prototype step exists so we can give you a real answer instead of a guess.",
  },
  {
    question: "Are any of your companies for sale?",
    answer: 'RestoreMySEO is open to offers. Use the form below and choose "Buy one of our companies."',
  },
];

function OwnerCell({ lead, note }: { lead: boolean; note?: string }) {
  return (
    <td className="px-6 py-4">{lead ? <span className="font-bold">Leads</span> : <span className="text-muted">{note}</span>}</td>
  );
}

export default function PartnerPage() {
  return (
    <>
      <SiteHeader current="partner" ctaHref="#start" />
      <main>
        <section className="gutter pt-[clamp(56px,8vw,112px)] pb-[clamp(56px,7vw,96px)]">
          <div className="shell flex flex-wrap items-end gap-14">
            <div className="flex min-w-0 flex-[1_1_620px] flex-col gap-7">
              <Eyebrow>How we partner</Eyebrow>
              <h1 className="m-0 text-display-xl font-[750] stretch-118">Partnerships, not projects.</h1>
              <p className="m-0 max-w-[640px] text-lead text-body">
                An agency sells hours and hands you the result. We would rather own part of what we build with you,
                so how we do depends on how the company does. Here is what that looks like, who it&apos;s for, and how
                a deal comes together.
              </p>
            </div>
            <dl className="m-0 min-w-0 flex-[1_1_400px] border-t border-ink text-[15px]">
              {heroFacts.map((fact) => (
                <div key={fact.label} className="flex flex-wrap gap-x-6 gap-y-1 border-b border-rule py-3.5">
                  <dt className="flex-[0_0_132px] pt-0.5 font-mono text-xs uppercase tracking-[0.1em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="m-0 flex-[1_1_200px] leading-[1.5]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="gutter section-y-md border-t border-rule">
          <div className="shell flex flex-col gap-10">
            <SectionHeader
              eyebrow="01 · The model"
              title="What each side puts in"
              aside="You stay the expert on the customer. We take the work most founders end up hiring three different firms to do."
            />
            <div className="overflow-x-auto rounded-xs border border-rule bg-card">
              <table className="w-full min-w-[640px] border-collapse text-base">
                <caption className="sr-only">Who leads each part of a PearTree partnership</caption>
                <thead>
                  <tr className="bg-ink text-paper">
                    {["Area", "You", "PearTree"].map((heading, index) => (
                      <th
                        key={heading}
                        scope="col"
                        className={`px-6 py-4 text-left font-mono text-xs font-medium uppercase tracking-[0.1em] ${
                          index > 0 ? "w-[26%]" : ""
                        }`}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {responsibilities.map((row, index) => (
                    <tr
                      key={row.area}
                      className={index < responsibilities.length - 1 ? "border-b border-rule-soft" : undefined}
                    >
                      <th scope="row" className="px-6 py-4 text-left font-semibold">
                        {row.area}
                      </th>
                      {row.owner === "shared" ? (
                        <td colSpan={2} className="bg-cell px-6 py-4 font-bold">
                          {row.shared ?? "Shared"}
                        </td>
                      ) : (
                        <>
                          <OwnerCell lead={row.owner === "you"} note={row.you} />
                          <OwnerCell lead={row.owner === "us"} note={row.us} />
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="surface-dark gutter section-y-md bg-night text-cream">
          <div className="shell flex flex-col gap-12">
            <div className="flex max-w-[820px] flex-col gap-5">
              <Eyebrow tone="dark">02 · Structures</Eyebrow>
              <h2 className="m-0 text-display-lg font-bold text-paper stretch-118">Three common shapes</h2>
              <p className="m-0 text-lg leading-[1.6] text-night-text">
                None of these is a template. We get specific about the numbers before anyone signs.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-5">
              {structures.map((structure) => (
                <div key={structure.label} className="flex flex-col gap-[18px] rounded-xs bg-night-raised p-8">
                  <span className="font-mono text-[13px] text-gold">{structure.label}</span>
                  <h3 className="m-0 text-[26px] font-bold text-paper stretch-116">{structure.title}</h3>
                  <p className="m-0 grow text-base leading-[1.65] text-night-text">{structure.body}</p>
                  <div className="border-t border-night-rule pt-4 font-mono text-[13px] text-night-muted">
                    {structure.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gutter section-y-md">
          <div className="shell flex flex-wrap gap-12">
            <div className="flex flex-[1_1_380px] flex-col gap-5">
              <Eyebrow>03 · Ownership</Eyebrow>
              <h2 className="m-0 text-display-lg font-bold stretch-118">Who owns what, in writing</h2>
              <p className="m-0 text-lg leading-[1.6] text-body">
                Partnerships go wrong when nobody wrote down the hard parts. We put them in a short interim agreement
                before the prototype is done, and in a full agreement before the build.
              </p>
            </div>
            <div className="grid flex-[1_1_640px] grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] border-t border-ink">
              {ownership.map((item) => (
                <div key={item.title} className="flex flex-col gap-2.5 border-b border-rule py-6 pr-6">
                  <span className="text-xl font-bold stretch-115">{item.title}</span>
                  <span className="text-base leading-[1.6] text-body">{item.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gutter section-y-md border-y border-rule bg-sand">
          <div className="shell flex flex-col gap-12">
            <SectionHeader eyebrow="04 · How a deal comes together" title="Four steps, each one a decision point" />
            <ol className="m-0 flex list-none flex-col border-t border-ink p-0">
              {dealSteps.map((step, index) => (
                <li
                  key={step.title}
                  className={`flex flex-wrap gap-x-10 gap-y-4 py-8 ${
                    index < dealSteps.length - 1 ? "border-b border-rule-strong" : ""
                  }`}
                >
                  <span aria-hidden="true" className="flex-[0_0_96px] font-mono text-[40px] leading-none text-bark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-[1_1_300px] flex-col gap-2.5">
                    <span className="text-2xl font-bold stretch-115">{step.title}</span>
                    <span className="text-base leading-[1.6] text-body">{step.body}</span>
                  </div>
                  <div className="flex flex-[1_1_300px] flex-col gap-2 text-[15px] leading-[1.55]">
                    <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{step.outcomeLabel}</span>
                    <span>{step.outcome}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="gutter section-y-md">
          <div className="shell flex flex-col gap-10">
            <SectionHeader eyebrow="05 · What we look for" title="The four things every partnership has" />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
              {criteria.map((item, index) => (
                <div key={item.title} className="flex flex-col gap-3 rounded-xs border border-rule bg-card p-7">
                  <span className="font-mono text-[13px] text-muted">5.{index + 1}</span>
                  <span className="text-xl font-bold stretch-115">{item.title}</span>
                  <span className="text-base leading-[1.6] text-body">{item.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gutter pb-[clamp(64px,8vw,112px)]">
          <div className="shell flex flex-wrap gap-12">
            <div className="flex flex-[1_1_380px] flex-col gap-5">
              <Eyebrow>06 · Questions</Eyebrow>
              <h2 className="m-0 text-display-lg font-bold stretch-118">Before you ask</h2>
            </div>
            <div className="flex flex-[1_1_640px] flex-col border-t border-ink">
              {faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0} className="border-b border-rule py-1">
                  <summary className="min-h-11 cursor-pointer py-[18px] text-xl font-bold stretch-112">
                    {faq.question}
                  </summary>
                  <p className="m-0 mb-[22px] max-w-[680px] text-base leading-[1.65] text-body">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <InquirySection
          id="start"
          eyebrow="Start here"
          title="Tell us what you know."
          intro="A few sentences is enough. The more you tell us about the customer, the better the first call goes."
          variant="partner"
        />
      </main>
      <SiteFooter />
    </>
  );
}
