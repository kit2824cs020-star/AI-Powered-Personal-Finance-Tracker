/**
 * Input — form text input with label, error, and helper text.
 */
export default function Input({
  id,
  label,
  error,
  helperText,
  className = "",
  required,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={id}
        className={[
          "w-full rounded-lg border px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400",
          "transition-colors duration-150 outline-none",
          "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          error
            ? "border-red-400 bg-red-50 focus:ring-red-400 focus:border-red-400"
            : "border-slate-200 bg-white hover:border-slate-300",
        ].join(" ")}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
}
