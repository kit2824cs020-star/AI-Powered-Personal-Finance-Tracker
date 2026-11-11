import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatCurrency, clampPercent } from "../../utils/formatters";
import { getCategoryById } from "../../data/sampleData";
import { Trash2, Pencil } from "lucide-react";

export default function BudgetCard({ budget, onEdit, onDelete }) {
  const cat     = getCategoryById(budget.category);
  const pct     = clampPercent(budget.spent, budget.limit);
  const remaining = budget.limit - budget.spent;
  const isOver  = budget.spent > budget.limit;

  const barColor = isOver ? "#ef4444" : pct >= 80 ? "#f59e0b" : "#3b82f6";

  return (
    <Card>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: cat.color }}
          >
            {cat.label.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{cat.label}</p>
            <p className="text-xs text-slate-400 capitalize">{budget.period}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="xs" onClick={() => onEdit(budget)} aria-label="Edit budget">
            <Pencil size={14} />
          </Button>
          <Button variant="ghost" size="xs" onClick={() => onDelete(budget.id)} aria-label="Delete budget">
            <Trash2 size={14} className="text-red-400" />
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar mb-2">
        <div
          className="progress-bar__fill"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>

      <div className="flex justify-between text-xs text-slate-500">
        <span>Spent: <strong className="text-slate-700">{formatCurrency(budget.spent)}</strong></span>
        <span>Limit: <strong className="text-slate-700">{formatCurrency(budget.limit)}</strong></span>
      </div>

      <div className="mt-2">
        {isOver ? (
          <Badge variant="danger">Over by {formatCurrency(budget.spent - budget.limit)}</Badge>
        ) : (
          <Badge variant={pct >= 80 ? "warning" : "info"}>
            {formatCurrency(remaining)} remaining ({pct}%)
          </Badge>
        )}
      </div>
    </Card>
  );
}
