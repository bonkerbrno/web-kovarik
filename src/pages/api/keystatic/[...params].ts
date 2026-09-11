// Keystatic API handler - only functional in dev mode
// In static builds, this generates no pages
export const prerender = true;

export function getStaticPaths() {
  return [];
}
