import { useState, useCallback } from "react";
import { SAMPLE_GOALS } from "../data/sampleData";

let _nextId = 300;

/**
 * useGoals — manages demo financial goals state.
 * In-memory only; resets on refresh (demo purposes).
 */
export function useGoals() {
  const [goals, setGoals] = useState(SAMPLE_GOALS);

  const addGoal = useCallback((data) => {
    const newGoal = { ...data, id: String(++_nextId), currentAmount: data.currentAmount || 0 };
    setGoals((prev) => [...prev, newGoal]);
    return newGoal;
  }, []);

  const updateGoal = useCallback((id, data) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...data } : g)));
  }, []);

  const deleteGoal = useCallback((id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }, []);

  return { goals, addGoal, updateGoal, deleteGoal };
}
