import { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import { CATEGORIES } from "../../data/sampleData";
import { validateForm, isRequired, isPositiveNumber, isDateString, hasErrors } from "../../utils/validators";
import { todayISO } from "../../utils/formatters";

const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c.id, label: c.label }));
const TYPE_OPTIONS = [
  { value: "expense", label: "Expense" },
  { value: "income",  label: "Income" },
];

const EMPTY = { description: "", amount: "", type: "expense", category: "food", date: todayISO() };
const RULES = {
  description: [isRequired],
  amount:      [isRequired, isPositiveNumber],
  date:        [isDateString],
};

export default function TransactionForm({ isOpen, onClose, onSave, initial }) {
  const isEdit = Boolean(initial);
  const [form, setForm]     = useState(initial ?? EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Sync form when editing a different transaction
  const reset = () => { setForm(initial ?? EMPTY); setErrors({}); };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm(form, RULES);
    if (hasErrors(errs)) { setErrors(errs); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 300)); // simulate save
    onSave({ ...form, amount: parseFloat(form.amount) });
    setLoading(false);
    onClose();
    reset();
  };

  const handleClose = () => { onClose(); reset(); };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? "Edit Transaction" : "Add Transaction"}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit} loading={loading}>
            {isEdit ? "Save Changes" : "Add Transaction"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          id="tx-description"
          label="Description"
          required
          placeholder="e.g. Swiggy Order"
          value={form.description}
          onChange={set("description")}
          error={errors.description}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="tx-amount"
            label="Amount (₹)"
            type="number"
            min="0"
            step="0.01"
            required
            placeholder="0.00"
            value={form.amount}
            onChange={set("amount")}
            error={errors.amount}
          />
          <Input
            id="tx-date"
            label="Date"
            type="date"
            required
            value={form.date}
            onChange={set("date")}
            error={errors.date}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select
            id="tx-type"
            label="Type"
            value={form.type}
            onChange={set("type")}
            options={TYPE_OPTIONS}
          />
          <Select
            id="tx-category"
            label="Category"
            value={form.category}
            onChange={set("category")}
            options={CATEGORY_OPTIONS}
          />
        </div>
      </form>
    </Modal>
  );
}
