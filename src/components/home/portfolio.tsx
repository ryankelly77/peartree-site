import NextLink from "next/link";
import { companies } from "@/content/companies";
import { CompanyCard } from "../company-card";
import { SectionHeader } from "../ui";

export function Portfolio() {
  return (
    <section id="portfolio" className="gutter section-y border-t border-rule">
      <div className="shell flex flex-col gap-12">
        <SectionHeader
          eyebrow="01 · Portfolio"
          title="The companies"
          aside="Some we started. Some we are building with partners. One is ready for a new owner."
        />

        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-5">
          {companies.map((company) => (
            <CompanyCard key={company.slug} company={company} />
          ))}
        </div>

        <NextLink
          href="#contact"
          className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-xs border border-dashed border-bark p-7 text-ink no-underline hover:bg-card hover:text-ink"
        >
          <span className="flex flex-[1_1_480px] flex-col gap-2">
            <span className="font-mono text-xs text-muted">No. 07 · Open</span>
            <span className="text-[28px] font-bold leading-[1.1] stretch-118">Your company</span>
            <span className="text-base leading-[1.6] text-body">
              We take on a small number of partnerships at a time, so each one gets the whole team.
            </span>
          </span>
          <span className="inline-flex min-h-[52px] items-center rounded-xs bg-ink px-7 text-base font-semibold text-paper">
            Start a conversation →
          </span>
        </NextLink>
      </div>
    </section>
  );
}
