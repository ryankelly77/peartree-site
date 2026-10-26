import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="gutter section-y">
        <div className="shell flex max-w-[760px] flex-col items-start gap-6">
          <Eyebrow>404</Eyebrow>
          <h1 className="m-0 text-display-lg font-bold stretch-118">That page isn&apos;t here.</h1>
          <p className="m-0 text-lg leading-[1.6] text-body">
            It may have moved when we rebuilt the site. The portfolio and our partnership model are a click away.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/">Go to the home page</ButtonLink>
            <ButtonLink href="/partner" variant="outline">
              How we partner
            </ButtonLink>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
