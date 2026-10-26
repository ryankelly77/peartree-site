export const site = {
  name: "PearTree Companies",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://peartreecompanies.com",
  description:
    "PearTree Companies is a San Antonio holding company that partners with founders and operators to launch products, build businesses and sell apps, bringing marketing, AI and software in exchange for a share of the outcome.",
  location: "San Antonio, Texas",
  foundingPartners: "Ryan Kelly and Tracie Mendoza",
};

export type NavKey = "portfolio" | "partner" | "approach" | "team";

export const mainNav: Array<{ key: NavKey; label: string; href: string }> = [
  { key: "portfolio", label: "Portfolio", href: "/#portfolio" },
  { key: "partner", label: "How we partner", href: "/partner" },
  { key: "approach", label: "What we bring", href: "/#approach" },
  { key: "team", label: "Who we are", href: "/#team" },
];

export const team = [
  {
    name: "Ryan Kelly",
    initials: "RK",
    role: "Co-Founder",
    bio: "Founded Pear Analytics in 2008. Still builds the software side of the portfolio himself.",
    tone: "ink" as const,
  },
  {
    name: "Tracie Mendoza",
    initials: "TM",
    role: "Co-Founder",
    bio: "[ONE-LINE BIO FOR TRACIE]",
    tone: "bark" as const,
  },
];
