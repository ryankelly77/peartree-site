import NextLink from "next/link";
import type { ReactNode } from "react";
import { cn, isExternal } from "@/lib/cn";

/** Internal links use next/link; external links render a plain anchor. */
export function SmartLink({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  "aria-current"?: "page";
}) {
  if (isExternal(href)) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={className} {...rest}>
      {children}
    </NextLink>
  );
}

type ButtonVariant = "solid" | "outline" | "gold";

const buttonVariants: Record<ButtonVariant, string> = {
  solid: "bg-ink text-paper hover:bg-bark hover:text-paper",
  outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
  gold: "bg-gold text-ink hover:bg-gold-hover hover:text-ink",
};

export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  className?: string;
  children: ReactNode;
}) {
  return (
    <SmartLink
      href={href}
      className={cn(
        "inline-flex items-center rounded-xs font-semibold no-underline transition-colors",
        size === "md" ? "min-h-[52px] px-7 text-base" : "min-h-11 px-5",
        buttonVariants[variant],
        className,
      )}
    >
      {children}
    </SmartLink>
  );
}

/** Small mono label with a gold square, used above every section heading. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em]",
        tone === "dark" ? "text-night-muted" : "text-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="inline-block size-2 bg-gold" />
      {children}
    </div>
  );
}

/** Eyebrow + h2, with an optional paragraph that sits to the right on wide screens. */
export function SectionHeader({
  eyebrow,
  title,
  aside,
  tone = "light",
  size = "lg",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
  size?: "lg" | "md";
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="flex flex-[1_1_520px] flex-col gap-5">
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            "m-0 font-bold stretch-118",
            size === "lg" ? "text-display-lg" : "text-display-md",
            tone === "dark" ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
      </div>
      {aside ? (
        <p
          className={cn(
            "m-0 flex-[0_1_460px] text-lg leading-[1.6]",
            tone === "dark" ? "text-night-text" : "text-body",
          )}
        >
          {aside}
        </p>
      ) : null}
    </div>
  );
}
