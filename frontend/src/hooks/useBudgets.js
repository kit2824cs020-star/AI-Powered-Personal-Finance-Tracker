import { useState, useCallback } from "react";
import { SAMPLE_BUDGETS } from "../data/sampleData";

let _nextId = 200;

/**
 * useBudgets — manages demo budget state.
 * In-memory only; resets on refresh (demo purposes).
 */
export function useBudgets() {
  const [budgets, setBudgets] = useState(SAMPLE_BUDGETS);

  const addBudget = useCallback((data) => {
    const newBudget = { ...data, id: String(++_nextId), spent: 0 };
    setBudgets((prev) => [...prev, newBudget]);
    return newBudget;
  }, []);

  const updateBudget = useCallback((id, data) => {
    setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  }, []);

  const deleteBudget = useCallback((id) => {
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { budgets, addBudget, updateBudget, deleteBudget };
}
