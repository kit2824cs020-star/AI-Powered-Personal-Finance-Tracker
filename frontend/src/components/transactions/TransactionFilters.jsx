import { Search } from "lucide-react";
import Select from "../common/Select";
import { CATEGORIES } from "../../data/sampleData";

const TYPE_OPTIONS = [
  { value: "all",     label: "All Types" },
  { value: "income",  label: "Income" },
  { value: "expense", label: "Expense" },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  ...CATEGORIES.map((c) => ({ value: c.id, label: c.label })),
];

export default function TransactionFilters({
  search, onSearchChange,
  categoryFilter, onCategoryChange,
  typeFilter, onTypeChange,
  dateFrom, onDateFromChange,
  dateTo, onDateToChange,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-3 items-end">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-300 transition-colors"
        />
      </div>

      {/* Type */}
      <Select
        id="type-filter"
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value)}
        options={TYPE_OPTIONS}
        className="w-36"
      />

      {/* Category */}
      <Select
        id="category-filter"
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        options={CATEGORY_OPTIONS}
        className="w-44"
      />

      {/* Date range */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-300 transition-colors"
          aria-label="Date from"
        />
        <span className="text-slate-400 text-sm">to</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-300 transition-colors"
          aria-label="Date to"
        />
      </div>
    </div>
  );
}
