import Card from "../common/Card";
import Badge from "../common/Badge";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { getCategoryById } from "../../data/sampleData";

export default function RecentTransactions({ transactions }) {
  const recent = transactions.slice(0, 7);

  return (
    <Card padding={false}>
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-base font-semibold text-slate-800">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-slate-50">
        {recent.map((tx) => {
          const cat = getCategoryById(tx.category);
          return (
            <div key={tx.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
              {/* Category dot */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                style={{ backgroundColor: cat.color }}
              >
                {cat.label.charAt(0)}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{tx.description}</p>
                <p className="text-xs text-slate-400">{formatDate(tx.date)} · {cat.label}</p>
              </div>
              {/* Amount */}
              <div className="text-right flex-shrink-0">
                <p
                  className={[
                    "text-sm font-semibold",
                    tx.type === "income" ? "text-emerald-600" : "text-red-500",
                  ].join(" ")}
                >
                  {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                </p>
                <Badge variant={tx.type === "income" ? "income" : "expense"} className="mt-0.5">
                  {tx.type}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
