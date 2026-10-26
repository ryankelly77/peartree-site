import { useId } from "react";

/**
 * EDIAGD logo, rebuilt from the inline SVG in the EDIAGD app header
 * (ediagd.vercel.app) with its brand colors resolved.
 */
export function EdiagdMark() {
  const clipId = useId();

  return (
    <div role="img" aria-label="EDIAGD logo" className="flex items-center gap-3.5">
      <svg width="60" height="60" viewBox="0 0 100 100" aria-hidden="true" className="shrink-0">
        <defs>
          <clipPath id={clipId}>
            <circle cx="50" cy="50" r="44" />
          </clipPath>
        </defs>
        <circle cx="50" cy="50" r="44" fill="#F4F0E4" />
        <g clipPath={`url(#${clipId})`}>
          <circle cx="50" cy="46" r="15" fill="#E8B44C" />
          <g stroke="#E8B44C" strokeWidth="3" strokeLinecap="round">
            <line x1="50" y1="18" x2="50" y2="26" />
            <line x1="30" y1="26" x2="35" y2="31" />
            <line x1="70" y1="26" x2="65" y2="31" />
            <line x1="22" y1="46" x2="30" y2="46" />
            <line x1="70" y1="46" x2="78" y2="46" />
          </g>
          <path d="M4 66 q 12 -9 23 0 t 23 0 t 23 0 t 23 0 v 40 H4 Z" fill="#4AA8B0" opacity="0.55" />
          <path d="M4 74 q 12 -9 23 0 t 23 0 t 23 0 t 23 0 v 30 H4 Z" fill="#4AA8B0" />
        </g>
        <circle cx="50" cy="50" r="44" fill="none" stroke="#0C1C2C" strokeWidth="4" />
      </svg>
      <span aria-hidden="true" className="flex flex-col gap-1 leading-[1.1]">
        <span
          className="text-2xl uppercase tracking-[0.22em] text-[#0C1C2C]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          EDIAGD
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.28em] text-[#4AA8B0]"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Every Day Is A Great Day
        </span>
      </span>
    </div>
  );
}
