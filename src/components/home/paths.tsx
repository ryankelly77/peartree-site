import { ButtonLink, SectionHeader } from "../ui";

const paths = [
  {
    letter: "A",
    title: "Launch a product",
    body: "You run a business and your customers keep asking for the same thing. We design and build it, then sell it to the customers you already have and the ones you don't.",
    note: "In practice: EDIAGD",
  },
  {
    letter: "B",
    title: "Build a business",
    body: "You have deep expertise and a model that works on paper or at small scale. We stand up the brand, the software, the marketing engine and the back office around it.",
    note: "In practice: Raptor Vending",
  },
  {
    letter: "C",
    title: "Sell an app",
    body: "You have an app or a working prototype and no reliable way to sell it. We take over go-to-market: positioning, acquisition, pricing, onboarding and the reporting that shows what's working.",
    note: "Built for: software founders with a product and no pipeline",
  },
];

export function Paths() {
  return (
    <section className="surface-dark gutter section-y bg-night text-cream">
      <div className="shell flex flex-col gap-14">
        <SectionHeader
          tone="dark"
          eyebrow="02 · How we partner"
          title="Three ways in"
          aside="Every partnership starts with someone who knows a market better than we do. What changes is the piece that's missing."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-px border border-night-rule bg-night-rule">
          {paths.map((path) => (
            <div key={path.letter} className="flex flex-col gap-5 bg-night px-8 py-9">
              <span aria-hidden="true" className="font-mono text-[44px] leading-none text-gold">
                {path.letter}
              </span>
              <h3 className="m-0 text-[28px] font-bold text-paper stretch-118">{path.title}</h3>
              <p className="m-0 grow text-base leading-[1.65] text-night-text">{path.body}</p>
              <div className="border-t border-night-rule pt-4 font-mono text-[13px] text-night-muted">{path.note}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-6 rounded-xs bg-night-raised p-8">
          <div className="flex flex-[1_1_560px] flex-col gap-2.5">
            <div className="text-[22px] font-bold text-paper stretch-112">How the deal works</div>
            <p className="m-0 text-base leading-[1.65] text-night-text">
              We don&apos;t bill partners by the hour. Depending on the deal, we split costs and revenue, take
              equity, or form a joint venture, and we put ownership of the code, the brand and the customers in
              writing before the full build starts.
            </p>
          </div>
          <ButtonLink href="/partner" variant="gold">
            How partnerships work →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
