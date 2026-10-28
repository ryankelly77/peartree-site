import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  /**
   * Two pages from the WordPress site this one replaces. Nothing else there is
   * worth keeping, and the old home page keeps its URL, so it needs no rule.
   *
   * Only the unslashed paths are listed. Next strips a trailing slash with its
   * own 308 first, so /2026-2/ reaches / in two hops rather than one. That is
   * fine for these: neither was ever indexed.
   */
  redirects() {
    return [
      { source: "/2026-2", destination: "/", permanent: true },
      { source: "/ediagd-brand-book", destination: "/", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
