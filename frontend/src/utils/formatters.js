/**
 * formatters.js — Shared formatting helpers (INR currency, dates, percentages)
 */

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const INR_DECIMAL = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format a number as INR currency: ₹1,20,000 */
export const formatCurrency = (amount) => INR.format(amount);

/** Format with decimal places: ₹1,20,000.50 */
export const formatCurrencyDecimal = (amount) => INR_DECIMAL.format(amount);

/** Format a date string (YYYY-MM-DD) to readable: "08 Nov 2026" */
export const formatDate = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

/** Format a date string to short month-year: "Nov 2026" */
export const formatMonthYear = (dateStr) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
};

/** Clamp a percentage between 0 and 100 */
export const clampPercent = (value, total) =>
  total <= 0 ? 0 : Math.min(100, Math.round((value / total) * 100));

/** Format a large number compactly: 120000 → "₹1.2L" */
export const formatCompact = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000)   return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000)     return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
};

/** Get today's date as YYYY-MM-DD string */
export const todayISO = () => new Date().toISOString().split("T")[0];

/** Pluralise a word: pluralise("day", 3) → "3 days" */
export const pluralise = (word, count) => `${count} ${word}${count === 1 ? "" : "s"}`;
