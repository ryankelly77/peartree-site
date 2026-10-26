import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { companies } from "@/content/companies";
import { site } from "@/content/site";
import { archivo, plexMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "PearTree Companies | Marketing, AI and software partners",
    template: "%s | PearTree Companies",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f6f2e9",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/peartree-companies-logo.webp`,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Antonio",
    addressRegion: "TX",
    addressCountry: "US",
  },
  founder: [
    { "@type": "Person", name: "Ryan Kelly" },
    { "@type": "Person", name: "Tracie Mendoza" },
  ],
  subOrganization: companies
    .filter((company) => company.website)
    .map((company) => ({ "@type": "Organization", name: company.name, url: company.website })),
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {gtmId ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
