// Serialize structured data for <script type="application/ld+json">.
// Escapes "<" so values containing "</script>" (e.g. user-submitted reviews,
// blog titles) cannot break out of the tag when rendered as server HTML.
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
