/** Black, with two faint pools of light drifting slowly behind everything, like the Mac app. */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[10%] top-[-10%] size-[60vmax] animate-[pool-a_26s_ease-in-out_infinite] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.07),transparent)]" />
      <div className="absolute bottom-[-20%] right-[-5%] size-[50vmax] animate-[pool-b_32s_ease-in-out_infinite] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.05),transparent)]" />
    </div>
  );
}
