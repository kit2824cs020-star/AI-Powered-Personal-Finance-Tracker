import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Card from "../common/Card";
import { getCategoryById } from "../../data/sampleData";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-md text-sm">
      <p className="font-semibold text-slate-700">{name}</p>
      <p className="text-slate-600">₹{value.toLocaleString("en-IN")}</p>
    </div>
  );
};

export default function CategoryPieChart({ data }) {
  const chartData = data.map(({ category, amount }) => {
    const cat = getCategoryById(category);
    return { name: cat.label, value: amount, color: cat.color };
  });

  return (
    <Card>
      <h3 className="text-base font-semibold text-slate-800 mb-4">Expense Breakdown</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
            iconSize={10}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
