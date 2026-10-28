import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "PearTree Companies: You know the industry. We build the company around it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Satori (behind ImageResponse) can only parse TTF, OTF and WOFF, and it draws
 * PNG/JPEG but silently skips WebP. The site's own Archivo WOFF2 and the WebP
 * logo therefore can't be used here, so this route reads two assets built for
 * it: a static Archivo instance pinned to the headline's axes (wght 750,
 * wdth 118) and a PNG copy of the brand logo.
 *
 * Both are read once at module scope; neither depends on the request.
 */
const archivo = await readFile(join(process.cwd(), "src/fonts/archivo-og-bold.ttf"));
const logo = await readFile(join(process.cwd(), "public/brand/peartree-companies-logo.png"));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          gap: 64,
          padding: "0 88px",
          backgroundColor: "#f6f2e9",
          fontFamily: "Archivo",
        }}
      >
        <img src={logoSrc} alt="" width={232} height={268} />
        <div
          style={{
            display: "flex",
            flex: 1,
            fontSize: 64,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: "#211b0f",
          }}
        >
          You know the industry. We build the company around it.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Archivo", data: archivo, style: "normal", weight: 400 }],
    },
  );
}
