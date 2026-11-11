/**
 * Card — base surface container.
 */
export default function Card({ children, className = "", padding = true, ...props }) {
  return (
    <div
      className={[
        "bg-white rounded-xl border border-slate-200 shadow-sm",
        padding ? "p-5" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
