import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import Card from "../common/Card";
import { formatCompact } from "../../utils/formatters";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-md text-sm">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: ₹{p.value.toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
};

export default function IncomeExpenseChart({ data }) {
  return (
    <Card className="col-span-2">
      <h3 className="text-base font-semibold text-slate-800 mb-4">Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barCategoryGap="30%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={formatCompact} tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} width={55} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => <span className="text-xs text-slate-600 capitalize">{value}</span>}
            wrapperStyle={{ paddingTop: "12px" }}
          />
          <Bar dataKey="income"   name="Income"   fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
