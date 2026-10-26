import { cacheLife } from "next/cache";

/**
 * The year is baked into the static shell and refreshed on the longest cache
 * profile. Calling `new Date()` directly during prerender is a build error
 * under Cache Components.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("max");
  return <>{new Date().getFullYear()}</>;
}
