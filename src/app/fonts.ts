import localFont from "next/font/local";

/**
 * Archivo variable (weight 100-900, width 62-125%), self-hosted.
 * The width axis drives the wide headline style via `font-stretch`.
 */
export const archivo = localFont({
  src: "../fonts/archivo-latin-wdth.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const plexMono = localFont({
  src: [
    { path: "../fonts/ibm-plex-mono-latin-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-mono-latin-500.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-plex-mono",
});
