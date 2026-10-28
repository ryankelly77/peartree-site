import Image from "next/image";
import type { Company, CompanyLogo, CompanyStatus, CardFooterItem } from "@/content/companies";
import { statusLabels } from "@/content/companies";
import { cn } from "@/lib/cn";
import { EdiagdMark } from "./ediagd-mark";
import { SmartLink } from "./ui";

const statusStyles: Record<CompanyStatus, string> = {
  operating: "border border-bark px-2.5 py-1.5 text-bark",
  expanding: "bg-gold px-2.5 py-1.5 text-ink",
  "in-build": "border border-dashed border-bark px-[9px] py-[5px] text-bark",
  available: "bg-ink px-2.5 py-1.5 text-paper",
};

export function StatusTag({ status }: { status: CompanyStatus }) {
  return (
    <span
      className={cn(
        "rounded-xs font-mono text-[11px] uppercase leading-none tracking-[0.1em]",
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

/** Logo image on its plate. Shared by the card panel and the company page hero. */
export function LogoImage({ logo, height }: { logo: CompanyLogo; height?: number }) {
  if (logo.kind === "ediagd") return <EdiagdMark />;
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      unoptimized
      className="block w-auto max-w-full"
      style={{ height: height ?? logo.cardHeight }}
    />
  );
}

function LogoPanel({ logo }: { logo: CompanyLogo }) {
  const dark = logo.kind === "image" && logo.plate === "dark";
  return (
    <div
      className={cn(
        "-mx-7 -mt-7 flex h-32 items-center rounded-t-xs border-b px-7",
        dark ? "border-plate-dark bg-plate-dark" : "border-rule-soft bg-white",
      )}
    >
      <LogoImage logo={logo} />
    </div>
  );
}

function FooterItem({ item }: { item: CardFooterItem }) {
  if ("text" in item) return <span className="text-muted">{item.text}</span>;
  return (
    <SmartLink href={item.href} className="py-3 font-semibold no-underline">
      {item.label}
    </SmartLink>
  );
}

export function CompanyCard({ company }: { company: Company }) {
  return (
    <article
      id={company.slug}
      className="flex scroll-mt-6 flex-col gap-[18px] rounded-xs border border-rule bg-card p-7"
    >
      <LogoPanel logo={company.logo} />
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted">
          No. {company.number} · {company.category}
        </span>
        <StatusTag status={company.status} />
      </div>
      <h3 className="m-0 text-[28px] font-bold leading-[1.1] stretch-118">{company.name}</h3>
      <p className="m-0 grow text-base leading-[1.6] text-body">{company.summary}</p>
      <div className="flex flex-wrap items-center justify-between gap-x-3 border-t border-rule-soft pt-4 text-sm">
        {company.footer.map((item, index) => (
          <FooterItem key={index} item={item} />
        ))}
      </div>
    </article>
  );
}
