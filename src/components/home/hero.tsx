import { ButtonLink, Eyebrow } from "../ui";

const youBring = [
  "Years inside an industry",
  "Customers, a list, or a way to reach them",
  "An idea, a prototype, or a model that already works",
];

const weBring = [
  "Brand, positioning and launch",
  "Paid search, SEO and AI visibility",
  "AI and software engineering",
  "CRM, analytics, hosting and security",
];

function TradeColumn({ title, items, divider }: { title: string; items: string[]; divider?: boolean }) {
  return (
    <div
      className={
        divider
          ? "flex flex-[1_1_200px] flex-col gap-4 border-rule p-6 max-[440px]:border-b min-[441px]:border-r"
          : "flex flex-[1_1_200px] flex-col gap-4 p-6"
      }
    >
      <div className="text-xl font-bold stretch-115">{title}</div>
      <ul className="m-0 flex list-none flex-col gap-3 p-0 text-base leading-[1.45] text-body">
        {items.map((item) => (
          <li key={item} className="border-t border-rule-soft pt-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="gutter pt-[clamp(56px,8vw,112px)] pb-[clamp(64px,8vw,120px)]">
      <div className="shell flex flex-wrap items-start gap-14">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-7">
          <Eyebrow>A holding company in San Antonio, Texas</Eyebrow>
          <h1 className="m-0 text-display-xl font-[750] text-ink stretch-118">
            You know the industry. We build the company around it.
          </h1>
          <p className="m-0 max-w-[620px] text-lead text-body">
            PearTree Companies owns and operates a small group of businesses, from an AI-first marketing agency to
            a smart vending company. We partner with founders and operators who need marketing, AI and software to
            launch a product, build a new business, or sell an app. We bring the team, and we share the risk.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#contact">Bring us an idea</ButtonLink>
            <ButtonLink href="#portfolio" variant="outline">
              See the portfolio
            </ButtonLink>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 font-mono text-[13px] text-muted">
            <span>Performance marketing since 2008</span>
            <span>Software we build and run ourselves</span>
            <span>Co-founded by Ryan Kelly and Tracie Mendoza</span>
          </div>
        </div>

        <div className="min-w-0 flex-[1_1_420px] rounded-xs border border-rule bg-card">
          <div className="flex items-center justify-between border-b border-rule px-6 py-4 font-mono text-xs uppercase tracking-[0.12em] text-muted">
            <span>The trade</span>
            <span>Every partnership</span>
          </div>
          <div className="flex flex-wrap">
            <TradeColumn title="You bring" items={youBring} divider />
            <TradeColumn title="We bring" items={weBring} />
          </div>
          <div className="flex flex-wrap items-baseline gap-3 border-t-2 border-gold bg-ink px-6 py-5 text-paper">
            <span aria-hidden="true" className="font-mono text-xl text-gold">
              =
            </span>
            <span className="text-lg font-semibold stretch-112">A company we build, own and grow together</span>
          </div>
        </div>
      </div>
    </section>
  );
}
