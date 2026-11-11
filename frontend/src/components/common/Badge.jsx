/**
 * Badge — small status/label chip.
 */
const VARIANTS = {
  income:    "bg-emerald-100 text-emerald-700",
  expense:   "bg-red-100 text-red-700",
  success:   "bg-emerald-100 text-emerald-700",
  danger:    "bg-red-100 text-red-700",
  warning:   "bg-amber-100 text-amber-700",
  info:      "bg-blue-100 text-blue-700",
  neutral:   "bg-slate-100 text-slate-600",
  purple:    "bg-purple-100 text-purple-700",
};

export default function Badge({ children, variant = "neutral", className = "" }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        VARIANTS[variant] ?? VARIANTS.neutral,
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
