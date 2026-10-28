/** Two faint vertical rails down the page at the content's edges, like AccessGrid's
 *  (lookap lazv1l): structure without competing with the hero's field. */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="mx-auto h-full max-w-6xl border-x border-white/[0.05]" />
    </div>
  );
}
