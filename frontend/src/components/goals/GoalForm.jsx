import { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";
import { validateForm, isRequired, isPositiveNumber, isDateString, hasErrors } from "../../utils/validators";

const EMPTY = { name: "", targetAmount: "", currentAmount: "", targetDate: "", icon: "Shield", color: "#3b82f6" };
const RULES = {
  name:         [isRequired],
  targetAmount: [isRequired, isPositiveNumber],
  targetDate:   [isDateString],
};

const COLOR_OPTIONS = [
  "#3b82f6","#8b5cf6","#f59e0b","#10b981","#ef4444","#f97316","#06b6d4","#ec4899",
];

export default function GoalForm({ isOpen, onClose, onSave, initial }) {
  const [form, setForm]     = useState(initial ?? EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const reset = () => { setForm(initial ?? EMPTY); setErrors({}); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm(form, RULES);
    if (hasErrors(errs)) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    onSave({
      ...form,
      targetAmount:  parseFloat(form.targetAmount),
      currentAmount: parseFloat(form.currentAmount) || 0,
    });
    setLoading(false);
    onClose(); reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { onClose(); reset(); }}
      title={initial ? "Edit Goal" : "Create Goal"}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={() => { onClose(); reset(); }} disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit} loading={loading}>
            {initial ? "Save Changes" : "Create Goal"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input id="goal-name" label="Goal Name" required placeholder="e.g. Emergency Fund" value={form.name} onChange={set("name")} error={errors.name} />
        <div className="grid grid-cols-2 gap-3">
          <Input id="goal-target" label="Target Amount (₹)" type="number" min="0" required value={form.targetAmount} onChange={set("targetAmount")} error={errors.targetAmount} />
          <Input id="goal-current" label="Already Saved (₹)" type="number" min="0" value={form.currentAmount} onChange={set("currentAmount")} helperText="Leave 0 if starting fresh" />
        </div>
        <Input id="goal-date" label="Target Date" type="date" required value={form.targetDate} onChange={set("targetDate")} error={errors.targetDate} />

        {/* Color picker */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Colour</p>
          <div className="flex gap-2 flex-wrap">
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setForm((f) => ({ ...f, color: c }))}
                className={[
                  "w-7 h-7 rounded-full border-2 transition-transform",
                  form.color === c ? "border-slate-600 scale-110" : "border-transparent",
                ].join(" ")}
                style={{ backgroundColor: c }}
                aria-label={`Select colour ${c}`}
              />
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
