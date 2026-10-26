import Image from "next/image";
import NextLink from "next/link";
import { mainNav, type NavKey } from "@/content/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "./ui";

/**
 * Rendered per page (not in the root layout) so the active link comes from a prop.
 * Reading the pathname in a layout would need a Suspense boundary under Cache Components.
 */
export function SiteHeader({ current, ctaHref = "/#contact" }: { current?: NavKey; ctaHref?: string }) {
  return (
    <header className="gutter border-b border-rule py-4">
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <NextLink href="/" aria-label="PearTree Companies home" className="inline-flex items-center">
          <Image
            src="/brand/peartree-companies-logo.webp"
            alt="PearTree Companies"
            width={320}
            height={369}
            unoptimized
            loading="eager"
            fetchPriority="high"
            className="block h-[76px] w-auto"
          />
        </NextLink>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px] font-medium">
          {mainNav.map((item) => {
            const active = item.key === current;
            return (
              <NextLink
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "py-3 text-ink hover:text-ink",
                  active
                    ? "underline decoration-gold decoration-2 underline-offset-[6px]"
                    : "no-underline hover:underline hover:decoration-rule hover:decoration-2 hover:underline-offset-[6px]",
                )}
              >
                {item.label}
              </NextLink>
            );
          })}
          <ButtonLink href={ctaHref} size="sm">
            Bring us an idea
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
