import type { Metadata } from "next";
import { Capabilities } from "@/components/home/capabilities";
import { FieldNotes } from "@/components/home/field-notes";
import { Hero } from "@/components/home/hero";
import { Paths } from "@/components/home/paths";
import { Portfolio } from "@/components/home/portfolio";
import { Process } from "@/components/home/process";
import { Team } from "@/components/home/team";
import { InquirySection } from "@/components/inquiry-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Title and description come from the root layout. Only the canonical is set
 * here, and on the page rather than the layout so that not-found.tsx, which
 * also renders under it, doesn't claim to be the home page.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader ctaHref="#contact" />
      <main>
        <Hero />
        <Portfolio />
        <Paths />
        <Capabilities />
        <FieldNotes />
        <Process />
        <Team />
        <InquirySection
          id="contact"
          eyebrow="07 · Contact"
          title="Bring us an idea."
          intro="Tell us what you're working on. It goes straight to Ryan and Tracie, not a sales queue."
          variant="home"
        />
      </main>
      <SiteFooter />
    </>
  );
}
