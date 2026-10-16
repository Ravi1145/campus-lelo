// Cover photos for blog posts. A post can set its own `image`; otherwise one of the campus photos in
// public/blog is chosen from the slug, so a post always gets the same photo.
// The photos are decorative, so they are rendered with an empty alt.

const POOL = ["/blog/blog-1.webp", "/blog/blog-2.webp", "/blog/blog-3.webp", "/blog/blog-4.webp", "/blog/blog-5.webp"]

export function blogImage(slug: string, explicit?: string | null): string {
  if (explicit) return explicit
  // FNV-1a, so slugs that start alike still spread across the photos
  let h = 2166136261
  for (let i = 0; i < slug.length; i++) { h ^= slug.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0 }
  h ^= h >>> 15
  return POOL[(h >>> 0) % POOL.length]
}
