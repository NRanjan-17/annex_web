/** Structured data (schema.org) for search engines and agents: what the page is about, as facts. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // `<` escaped so nothing in the data can close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
