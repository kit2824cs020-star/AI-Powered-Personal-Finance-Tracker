import Card from "../common/Card";

/**
 * StatCard — single KPI card for dashboard metrics.
 */
export default function StatCard({ title, value, subtitle, icon: Icon, color = "blue", trend }) {
  const colorMap = {
    blue:   { bg: "bg-blue-50",    icon: "text-blue-600",   border: "border-blue-100" },
    green:  { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100" },
    red:    { bg: "bg-red-50",     icon: "text-red-600",    border: "border-red-100" },
    purple: { bg: "bg-purple-50",  icon: "text-purple-600", border: "border-purple-100" },
  };
  const c = colorMap[color] ?? colorMap.blue;

  return (
    <Card className="flex items-start gap-4">
      <div className={`p-3 rounded-xl ${c.bg} ${c.border} border flex-shrink-0`}>
        <Icon size={22} className={c.icon} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5 truncate">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        {trend !== undefined && (
          <span
            className={[
              "inline-block text-xs font-medium mt-1",
              trend >= 0 ? "text-emerald-600" : "text-red-500",
            ].join(" ")}
          >
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% vs last month
          </span>
        )}
      </div>
    </Card>
  );
}
