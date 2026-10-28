/** The Google Tag Manager queue. Absent until the GTM snippet in app/layout.tsx runs, which only happens when NEXT_PUBLIC_GTM_ID is set. */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export {};
