import { useState, useMemo, useCallback } from "react";
import { SAMPLE_TRANSACTIONS } from "../data/sampleData";
import { todayISO } from "../utils/formatters";

let _nextId = 100;

/**
 * useTransactions — manages demo transaction state with CRUD and filtering.
 * Data is in-memory only and resets on page refresh (demo purposes).
 */
export function useTransactions() {
  const [transactions, setTransactions] = useState(SAMPLE_TRANSACTIONS);
  const [search, setSearch]             = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter]     = useState("all");
  const [dateFrom, setDateFrom]         = useState("");
  const [dateTo, setDateTo]             = useState("");

  // ── Filtered list ──────────────────────────────────────────
  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        !search ||
        tx.description.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase());

      const matchCategory = categoryFilter === "all" || tx.category === categoryFilter;
      const matchType     = typeFilter === "all" || tx.type === typeFilter;
      const matchFrom     = !dateFrom || tx.date >= dateFrom;
      const matchTo       = !dateTo   || tx.date <= dateTo;

      return matchSearch && matchCategory && matchType && matchFrom && matchTo;
    });
  }, [transactions, search, categoryFilter, typeFilter, dateFrom, dateTo]);

  // ── CRUD ───────────────────────────────────────────────────
  const addTransaction = useCallback((data) => {
    const newTx = { ...data, id: String(++_nextId), date: data.date || todayISO() };
    setTransactions((prev) => [newTx, ...prev]);
    return newTx;
  }, []);

  const updateTransaction = useCallback((id, data) => {
    setTransactions((prev) => prev.map((tx) => (tx.id === id ? { ...tx, ...data } : tx)));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  // ── Computed totals ────────────────────────────────────────
  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, tx) => {
        if (tx.type === "income")  acc.income   += tx.amount;
        else                        acc.expenses += tx.amount;
        return acc;
      },
      { income: 0, expenses: 0 }
    );
  }, [transactions]);

  return {
    transactions,
    filtered,
    totals,
    search, setSearch,
    categoryFilter, setCategoryFilter,
    typeFilter, setTypeFilter,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
