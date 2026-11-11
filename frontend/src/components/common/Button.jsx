import { cloneElement } from "react";

const BASE =
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none";

const VARIANTS = {
  primary:   "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-blue-600",
  secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-blue-600",
  danger:    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:outline-red-600",
  ghost:     "text-slate-600 hover:bg-slate-100 active:bg-slate-200 focus-visible:outline-blue-600",
  success:   "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:outline-emerald-600",
};

const SIZES = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

/**
 * Button — the primary interactive element.
 * @param {string}  variant  - primary | secondary | danger | ghost | success
 * @param {string}  size     - xs | sm | md | lg
 * @param {boolean} loading  - shows spinner and disables
 * @param {boolean} fullWidth
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={[
        BASE,
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
