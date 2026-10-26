/**
 * The PearTree portfolio.
 *
 * Every company appears as a card on the home page, in the footer, and in the
 * Organization structured data. A company with a `story` also gets its own page
 * at /portfolio/[slug], built from the same template as Raptor Vending.
 *
 * Bracketed text like [DATE] marks a fact that still needs to be supplied.
 */

export type CompanyStatus = "operating" | "expanding" | "in-build" | "available";

export type CompanyLogo =
  | {
      kind: "image";
      src: string;
      alt: string;
      /** Intrinsic size of the file in /public */
      width: number;
      height: number;
      /** Rendered height in the 128px card panel */
      cardHeight: number;
      /** Panel color behind the logo. Use "dark" for logos made for dark sites. */
      plate: "light" | "dark";
    }
  | { kind: "ediagd" };

export type Link = { label: string; href: string };

/** One side of the card footer: plain text, or a link. */
export type CardFooterItem = { text: string } | Link;

export interface CompanyStory {
  seoDescription: string;
  lead: string;
  facts: { label: string; value: string }[];
  /** Set `src` once a real photo exists; until then the placeholder text shows. */
  photo: { src?: string; alt: string; placeholder: string };
  primaryCta: Link;
  secondaryCta: Link;
  idea: { heading: string; paragraphs: string[] };
  built: { heading: string; items: { label: string; title: string; body: string }[] };
  standing: { heading: string; stats: { value: string; label: string }[] };
  closer: { id: string; eyebrow: string; heading: string; body: string; cta: Link };
}

export interface Company {
  slug: string;
  number: string;
  name: string;
  category: string;
  status: CompanyStatus;
  summary: string;
  website?: string;
  logo: CompanyLogo;
  footer: [CardFooterItem, CardFooterItem];
  story?: CompanyStory;
}

export const companies: Company[] = [
  {
    slug: "pear-analytics",
    number: "01",
    name: "Pear Analytics",
    category: "Marketing and AI",
    status: "operating",
    summary:
      "AI-first performance marketing for mid-market and enterprise brands: Google Ads, SEO and AI visibility, analytics, and custom AI applications.",
    website: "https://pearanalytics.com",
    logo: {
      kind: "image",
      src: "/logos/pear-analytics.webp",
      alt: "Pear Analytics logo",
      width: 371,
      height: 96,
      cardHeight: 52,
      plate: "light",
    },
    footer: [{ text: "Founded 2008" }, { label: "pearanalytics.com ↗", href: "https://pearanalytics.com" }],
  },
  {
    slug: "pyrus-digital-media",
    number: "02",
    name: "Pyrus Digital Media",
    category: "Small business",
    status: "operating",
    summary:
      "Websites, SEO, PPC and hosting for small businesses that want a capable team without agency overhead.",
    website: "https://pyrusdigitalmedia.com",
    logo: {
      kind: "image",
      src: "/logos/pyrus-digital-media.webp",
      alt: "Pyrus Digital Media logo",
      width: 179,
      height: 152,
      cardHeight: 76,
      plate: "light",
    },
    footer: [
      { text: "Founded and operated" },
      { label: "pyrusdigitalmedia.com ↗", href: "https://pyrusdigitalmedia.com" },
    ],
  },
  {
    slug: "raptor-vending",
    number: "03",
    name: "Raptor Vending",
    category: "Smart retail",
    status: "expanding",
    summary:
      "Fresh meals, snacks and drinks for San Antonio office and medical buildings, with no minimums for the building and a monthly report from the Raptor Portal.",
    website: "https://raptor-vending.com",
    logo: {
      kind: "image",
      src: "/logos/raptor-vending.webp",
      alt: "Raptor Vending logo",
      width: 237,
      height: 144,
      cardHeight: 68,
      plate: "dark",
    },
    footer: [
      { label: "Read the story →", href: "/portfolio/raptor-vending" },
      { label: "raptor-vending.com ↗", href: "https://raptor-vending.com" },
    ],
    story: {
      seoDescription:
        "Raptor Vending puts fresh meals, snacks and drinks in San Antonio office and medical buildings, with no minimums and a monthly report for every building.",
      lead: "Fresh meals, snacks and drinks for office and medical buildings in San Antonio, run with the reporting of a software company.",
      facts: [
        { label: "Relationship", value: "Co-founded with Cristian [LAST NAME]" },
        { label: "Market", value: "San Antonio, Texas" },
        { label: "Started", value: "[YEAR]" },
        { label: "Partnership path", value: "Build a business" },
      ],
      photo: {
        alt: "A Raptor fridge and meal display in a building lobby",
        placeholder: "[PHOTO: Raptor fridge and meal display in a building lobby]",
      },
      primaryCta: { label: "Visit raptor-vending.com ↗", href: "https://raptor-vending.com" },
      secondaryCta: { label: "For property managers", href: "#buildings" },
      idea: {
        heading: "Buildings want amenities. Tenants want real food.",
        paragraphs: [
          "Tenant companies already spend money feeding their people, often through delivery-app credits. Most office buildings still offer a vending machine and a long walk to lunch.",
          "Raptor puts fresh meals, snacks and drinks in the building, with no minimums or revenue guarantees for the property. Every month the property manager gets a report on what sold, so the amenity shows up in tenant conversations instead of being forgotten in a corner of the lobby.",
        ],
      },
      built: {
        heading: "The company behind the fridge",
        items: [
          {
            label: "Brand",
            title: "Name, identity and website",
            body: "A brand that reads as a premium amenity in a Class A lobby, not a snack machine.",
          },
          {
            label: "Software",
            title: "The Raptor Portal",
            body: "Sales, inventory and locations in one place, with automated monthly reports sent to each building.",
          },
          {
            label: "Demand",
            title: "Programs that bring people back",
            body: "Loyalty, coupons and meal-subsidy options that buildings and employers can fund for their tenants.",
          },
          {
            label: "Sales",
            title: "Property manager pipeline",
            body: "Outreach and pitch materials built for property management firms with multiple buildings.",
          },
        ],
      },
      standing: {
        heading: "Growing one building at a time",
        stats: [
          { value: "2", label: "buildings operating today" },
          { value: "6", label: "more planned for late 2026 and early 2027" },
          { value: "$0", label: "minimums or revenue guarantees for buildings" },
          { value: "1", label: "monthly report per building, sent automatically" },
        ],
      },
      closer: {
        id: "buildings",
        eyebrow: "For property managers",
        heading: "Have a building in San Antonio?",
        body: "No minimums, no revenue guarantees, and a monthly report you can share with tenants.",
        cta: { label: "Talk to Raptor ↗", href: "https://raptor-vending.com" },
      },
    },
  },
  {
    slug: "ediagd",
    number: "04",
    name: "EDIAGD",
    category: "Automotive AI",
    status: "in-build",
    summary:
      "Every Day Is A Great Day. Daily AI coaching for dealership service advisors, built from a veteran coach's playbook, with impact reporting for managers.",
    logo: { kind: "ediagd" },
    footer: [{ text: "Partnership with Mitch Hardt" }, { text: "Launching [DATE]" }],
  },
  {
    slug: "cce",
    number: "05",
    name: "CCE",
    category: "Online education",
    status: "operating",
    summary: "Accredited online continuing education for insurance professionals.",
    website: "https://cceducation.com",
    logo: {
      kind: "image",
      src: "/logos/cce.webp",
      alt: "Center for Continuing Education logo",
      width: 213,
      height: 144,
      cardHeight: 72,
      plate: "light",
    },
    footer: [{ text: "Owned and operated" }, { label: "cceducation.com ↗", href: "https://cceducation.com" }],
  },
  {
    slug: "restoremyseo",
    number: "06",
    name: "RestoreMySEO",
    category: "SEO recovery",
    status: "available",
    summary: "Diagnostics and recovery for sites hit by penalties, botched migrations and ranking drops.",
    website: "https://restoremyseo.com",
    logo: {
      kind: "image",
      src: "/logos/restoremyseo.webp",
      alt: "RestoreMySEO logo",
      width: 439,
      height: 96,
      cardHeight: 44,
      plate: "light",
    },
    footer: [
      { label: "Make an offer →", href: "/#contact" },
      { label: "restoremyseo.com ↗", href: "https://restoremyseo.com" },
    ],
  },
];

export const statusLabels: Record<CompanyStatus, string> = {
  operating: "Operating",
  expanding: "Expanding",
  "in-build": "In build",
  available: "Available",
};

export function getCompany(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug);
}

export function companiesWithStories(): Array<Company & { story: CompanyStory }> {
  return companies.filter((company): company is Company & { story: CompanyStory } => Boolean(company.story));
}

/** Where a company links from the footer and the "next company" card. */
export function companyHref(company: Company): string {
  if (company.story) return `/portfolio/${company.slug}`;
  if (company.website) return company.website;
  return `/#${company.slug}`;
}
