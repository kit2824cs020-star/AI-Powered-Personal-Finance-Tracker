/**
 * Select — styled native select with label and error.
 */
export default function Select({
  id,
  label,
  error,
  options = [],
  placeholder,
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
      <select
        id={id}
        className={[
          "w-full rounded-lg border px-3 py-2.5 text-sm text-slate-800",
          "transition-colors duration-150 outline-none appearance-none bg-white",
          "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_12px_center]",
          "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          error
            ? "border-red-400 bg-red-50"
            : "border-slate-200 hover:border-slate-300",
        ].join(" ")}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
