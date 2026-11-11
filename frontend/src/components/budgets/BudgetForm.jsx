import { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import { CATEGORIES } from "../../data/sampleData";
import { validateForm, isRequired, isPositiveNumber, hasErrors } from "../../utils/validators";

const CATEGORY_OPTIONS = CATEGORIES.filter(
  (c) => !["salary", "freelance", "investment"].includes(c.id)
).map((c) => ({ value: c.id, label: c.label }));

const PERIOD_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly",  label: "Yearly" },
];

const EMPTY = { category: "food", limit: "", period: "monthly" };
const RULES = { limit: [isRequired, isPositiveNumber] };

export default function BudgetForm({ isOpen, onClose, onSave, initial }) {
  const [form, setForm]   = useState(initial ?? EMPTY);
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
    onSave({ ...form, limit: parseFloat(form.limit) });
    setLoading(false);
    onClose(); reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { onClose(); reset(); }}
      title={initial ? "Edit Budget" : "Create Budget"}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={() => { onClose(); reset(); }} disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit} loading={loading}>
            {initial ? "Save Changes" : "Create Budget"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Select id="budget-category" label="Category" value={form.category} onChange={set("category")} options={CATEGORY_OPTIONS} />
        <Input id="budget-limit" label="Monthly Limit (₹)" type="number" min="0" required placeholder="e.g. 5000" value={form.limit} onChange={set("limit")} error={errors.limit} />
        <Select id="budget-period" label="Period" value={form.period} onChange={set("period")} options={PERIOD_OPTIONS} />
      </form>
    </Modal>
  );
}
