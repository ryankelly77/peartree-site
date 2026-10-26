import { NextResponse, type NextRequest } from "next/server";
import { companiesWithStories } from "@/content/companies";

const knownSlugs = new Set(companiesWithStories().map((company) => company.slug));

/**
 * Company pages are prerendered from content/companies.ts. Under Cache Components an
 * unknown slug would stream a "soft" 404 (status 200 + noindex), so unknown slugs are
 * rewritten to an unmatched path here, which renders app/not-found.tsx with a real 404.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !knownSlugs.has(slug)) {
    return NextResponse.rewrite(new URL("/_404", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/portfolio/:slug+",
};
