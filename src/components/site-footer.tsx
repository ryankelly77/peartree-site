import Image from "next/image";
import NextLink from "next/link";
import { companies, companyHref } from "@/content/companies";
import { site } from "@/content/site";
import { CurrentYear } from "./current-year";
import { SmartLink } from "./ui";

const companyLinks = [
  { label: "How we partner", href: "/partner" },
  { label: "What we bring", href: "/#approach" },
  { label: "Who we are", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div className="flex flex-col gap-2.5 text-[15px]">
      <span className="pb-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted">{title}</span>
      {links.map((link) => (
        <SmartLink key={link.label} href={link.href} className="no-underline hover:underline">
          {link.label}
        </SmartLink>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="gutter border-t border-rule bg-paper pt-14 pb-10">
      <div className="shell flex flex-col gap-10">
        <div className="flex flex-wrap justify-between gap-10">
          <NextLink href="/" aria-label="PearTree Companies home" className="self-start">
            <Image
              src="/brand/peartree-companies-logo.webp"
              alt="PearTree Companies"
              width={320}
              height={369}
              unoptimized
              className="block h-[132px] w-auto"
            />
          </NextLink>
          <div className="flex flex-wrap gap-12">
            <FooterColumn
              title="Portfolio"
              links={companies.map((company) => ({ label: company.name, href: companyHref(company) }))}
            />
            <FooterColumn title="Company" links={companyLinks} />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-rule pt-5 font-mono text-xs text-muted">
          <span>
            © <CurrentYear /> {site.name}
          </span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  );
}
