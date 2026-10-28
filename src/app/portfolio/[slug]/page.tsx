import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { LogoImage, StatusTag } from "@/components/company-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { companies, companiesWithStories, getCompany } from "@/content/companies";
import { cn } from "@/lib/cn";

/**
 * Company pages are prerendered for every company with a `story`.
 * `instant = false` lets this route read `params` at the top level, so an
 * unknown slug calls notFound() before streaming and returns a real 404.
 */
export const instant = false;

export function generateStaticParams() {
  return companiesWithStories().map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company?.story) return {};
  return {
    title: company.name,
    description: company.story.seoDescription,
    alternates: { canonical: `/portfolio/${company.slug}` },
  };
}

export default async function CompanyPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company?.story) notFound();

  const { story } = company;
  const index = companies.findIndex((entry) => entry.slug === company.slug);
  const next = companies[(index + 1) % companies.length];
  const darkPlate = company.logo.kind === "image" && company.logo.plate === "dark";

  return (
    <>
      <SiteHeader current="portfolio" ctaHref="/partner#start" />
      <main>
        <section className="gutter pt-[clamp(40px,6vw,80px)] pb-[clamp(48px,6vw,80px)]">
          <div className="shell flex flex-col gap-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 font-mono text-[13px] text-muted">
              <NextLink href="/#portfolio" className="py-3 no-underline">
                Portfolio
              </NextLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink">
                {company.name}
              </span>
            </nav>

            <div className="flex flex-wrap items-end gap-12">
              <div className="flex min-w-0 flex-[1_1_620px] flex-col gap-6">
                <div
                  className={cn(
                    "self-start rounded-xs px-[26px] py-[18px]",
                    darkPlate ? "bg-plate-dark" : "border border-rule-soft bg-white",
                  )}
                >
                  <LogoImage logo={company.logo} height={72} />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-muted">
                    No. {company.number} · {company.category}
                  </span>
                  <StatusTag status={company.status} />
                </div>
                <h1 className="m-0 text-display-company font-[750] stretch-118">{company.name}</h1>
                <p className="m-0 max-w-[620px] text-[clamp(18px,1.6vw,22px)] leading-[1.55] text-body">
                  {story.lead}
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href={story.primaryCta.href}>{story.primaryCta.label}</ButtonLink>
                  <ButtonLink href={story.secondaryCta.href} variant="outline">
                    {story.secondaryCta.label}
                  </ButtonLink>
                </div>
              </div>
              <dl className="m-0 min-w-0 flex-[1_1_380px] border-t border-ink text-[15px]">
                {story.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-wrap gap-x-6 gap-y-1 border-b border-rule py-3.5">
                    <dt className="flex-[0_0_132px] pt-0.5 font-mono text-xs uppercase tracking-[0.1em] text-muted">
                      {fact.label}
                    </dt>
                    <dd className="m-0 flex-[1_1_180px] leading-[1.5]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {story.photo.src ? (
              <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xs border border-rule">
                <Image
                  src={story.photo.src}
                  alt={story.photo.alt}
                  fill
                  sizes="(min-width: 1376px) 1280px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </section>

        <section className="gutter section-y-sm border-t border-rule">
          <div className="shell flex flex-wrap gap-12">
            <div className="flex flex-[1_1_380px] flex-col gap-5">
              <Eyebrow>01 · The idea</Eyebrow>
              <h2 className="m-0 text-display-md font-bold stretch-118">{story.idea.heading}</h2>
            </div>
            <div className="flex flex-[1_1_560px] flex-col gap-5 text-lg leading-[1.65] text-body">
              {story.idea.paragraphs.map((paragraph) => (
                <p key={paragraph} className="m-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="gutter section-y-sm border-y border-rule bg-sand">
          <div className="shell flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <Eyebrow>02 · What PearTree built</Eyebrow>
              <h2 className="m-0 text-display-md font-bold stretch-118">{story.built.heading}</h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
              {story.built.items.map((item) => (
                <div key={item.title} className="flex flex-col gap-3 rounded-xs border border-rule bg-paper p-7">
                  <span className="font-mono text-[13px] text-muted">{item.label}</span>
                  <span className="text-[22px] font-bold stretch-115">{item.title}</span>
                  <span className="text-base leading-[1.6] text-body">{item.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gutter section-y-sm">
          <div className="shell flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <Eyebrow>03 · Where it stands</Eyebrow>
              <h2 className="m-0 text-display-md font-bold stretch-118">{story.standing.heading}</h2>
            </div>
            <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] border-t-2 border-ink">
              {story.standing.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse justify-end gap-2 border-b border-rule py-7 pr-6"
                >
                  <dt className="text-base text-body">{stat.label}</dt>
                  <dd className="m-0 font-mono text-[clamp(44px,5vw,72px)] font-medium leading-none">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id={story.closer.id} className="surface-dark gutter section-y-sm bg-night text-cream">
          <div className="shell flex flex-wrap items-center justify-between gap-x-16 gap-y-8">
            <div className="flex flex-[1_1_560px] flex-col gap-[18px]">
              <Eyebrow tone="dark">{story.closer.eyebrow}</Eyebrow>
              <h2 className="m-0 text-display-md font-bold text-paper stretch-118">{story.closer.heading}</h2>
              <p className="m-0 text-lg leading-[1.6] text-night-text">{story.closer.body}</p>
            </div>
            <ButtonLink href={story.closer.cta.href} variant="gold">
              {story.closer.cta.label}
            </ButtonLink>
          </div>
        </section>

        <nav aria-label="More companies" className="gutter py-[clamp(56px,7vw,96px)]">
          <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5">
            <NextLink
              href="/#portfolio"
              className="flex flex-col gap-2.5 rounded-xs border border-rule bg-card p-7 text-ink no-underline hover:border-ink hover:text-ink"
            >
              <span className="font-mono text-xs text-muted">← Back</span>
              <span className="text-[26px] font-bold stretch-116">All companies</span>
            </NextLink>
            <NextLink
              href={next.story ? `/portfolio/${next.slug}` : `/#${next.slug}`}
              className="flex flex-col gap-2.5 rounded-xs border border-ink bg-card p-7 text-right text-ink no-underline hover:bg-paper hover:text-ink"
            >
              <span className="font-mono text-xs text-muted">Next · No. {next.number} →</span>
              <span className="text-[26px] font-bold stretch-116">{next.name}</span>
            </NextLink>
          </div>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
