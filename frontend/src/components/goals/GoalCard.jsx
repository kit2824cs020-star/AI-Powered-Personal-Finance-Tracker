import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatCurrency, clampPercent, formatDate } from "../../utils/formatters";
import { Trash2, Pencil } from "lucide-react";

const ICON_MAP = {
  Shield: "🛡️", Laptop: "💻", Plane: "✈️", Home: "🏠",
  Car: "🚗", Heart: "❤️", GraduationCap: "🎓", default: "🎯",
};

export default function GoalCard({ goal, onEdit, onDelete }) {
  const pct = clampPercent(goal.currentAmount, goal.targetAmount);
  const remaining = goal.targetAmount - goal.currentAmount;
  const isComplete = goal.currentAmount >= goal.targetAmount;
  const icon = ICON_MAP[goal.icon] ?? ICON_MAP.default;

  return (
    <Card>
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ backgroundColor: goal.color + "22" }}
          >
            {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{goal.name}</p>
            <p className="text-xs text-slate-400">Target: {formatDate(goal.targetDate)}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="xs" onClick={() => onEdit(goal)} aria-label="Edit goal">
            <Pencil size={14} />
          </Button>
          <Button variant="ghost" size="xs" onClick={() => onDelete(goal.id)} aria-label="Delete goal">
            <Trash2 size={14} className="text-red-400" />
          </Button>
        </div>
      </div>

      {/* Amounts */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-500">Saved</span>
        <span className="font-semibold text-slate-800">
          {formatCurrency(goal.currentAmount)}
          <span className="text-slate-400 font-normal"> / {formatCurrency(goal.targetAmount)}</span>
        </span>
      </div>

      {/* Progress */}
      <div className="progress-bar mb-3">
        <div
          className="progress-bar__fill"
          style={{ width: `${pct}%`, backgroundColor: isComplete ? "#10b981" : goal.color }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">{pct}% complete</span>
        {isComplete ? (
          <Badge variant="success">🎉 Goal Achieved!</Badge>
        ) : (
          <Badge variant="info">{formatCurrency(remaining)} to go</Badge>
        )}
      </div>
    </Card>
  );
}
