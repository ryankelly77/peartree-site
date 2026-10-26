import type { ReactNode } from "react";
import { InquiryForm } from "./inquiry-form";
import { Eyebrow } from "./ui";

/** Dark closing section with the inquiry form. Used on Home (#contact) and Partner (#start). */
export function InquirySection({
  id,
  eyebrow,
  title,
  intro,
  variant,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  variant: "home" | "partner";
}) {
  return (
    <section id={id} className="surface-dark gutter section-y bg-ink text-cream">
      <div className="shell flex flex-wrap gap-14">
        <div className="flex flex-[1_1_400px] flex-col gap-5">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h2 className="m-0 text-display-cta font-[750] text-paper stretch-118">{title}</h2>
          <p className="m-0 max-w-[440px] text-lg leading-[1.6] text-night-text">{intro}</p>
        </div>
        <InquiryForm variant={variant} />
      </div>
    </section>
  );
}
