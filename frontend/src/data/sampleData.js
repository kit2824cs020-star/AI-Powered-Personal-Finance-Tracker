/**
 * sampleData.js
 * ─────────────────────────────────────────────────────────────
 * DEMO DATA ONLY — Not connected to any backend or database.
 * All figures are fictional and for UI demonstration purposes.
 * Currency: Indian Rupee (INR ₹)
 * ─────────────────────────────────────────────────────────────
 */

// ─── Categories ───────────────────────────────────────────────
export const CATEGORIES = [
  { id: "food",          label: "Food & Dining",      color: "#f59e0b", icon: "UtensilsCrossed" },
  { id: "transport",     label: "Transport",           color: "#3b82f6", icon: "Car" },
  { id: "utilities",     label: "Utilities & Bills",   color: "#8b5cf6", icon: "Zap" },
  { id: "shopping",      label: "Shopping",            color: "#ec4899", icon: "ShoppingBag" },
  { id: "health",        label: "Health & Medical",    color: "#10b981", icon: "Heart" },
  { id: "entertainment", label: "Entertainment",       color: "#f97316", icon: "Tv" },
  { id: "education",     label: "Education",           color: "#06b6d4", icon: "GraduationCap" },
  { id: "rent",          label: "Rent & Housing",      color: "#6366f1", icon: "Home" },
  { id: "salary",        label: "Salary",              color: "#16a34a", icon: "Briefcase" },
  { id: "freelance",     label: "Freelance",           color: "#0ea5e9", icon: "Laptop" },
  { id: "investment",    label: "Investment Return",   color: "#84cc16", icon: "TrendingUp" },
  { id: "other",         label: "Other",               color: "#94a3b8", icon: "MoreHorizontal" },
];

export const getCategoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];

// ─── Transactions ─────────────────────────────────────────────
let _txId = 1;
const tx = (date, type, category, description, amount) => ({
  id: String(_txId++),
  date,
  type,       // "income" | "expense"
  category,
  description,
  amount,     // positive number, INR
});

export const SAMPLE_TRANSACTIONS = [
  // November 2026
  tx("2026-11-08", "income",  "salary",        "Monthly Salary — TechCorp",     95000),
  tx("2026-11-08", "expense", "rent",           "November Rent",                 22000),
  tx("2026-11-07", "expense", "food",           "Swiggy Order — Dinner",          680),
  tx("2026-11-07", "expense", "transport",      "Ola cab to office",              320),
  tx("2026-11-06", "expense", "utilities",      "Electricity Bill",              1850),
  tx("2026-11-06", "income",  "freelance",      "UI Design Project — Client A",  18000),
  tx("2026-11-05", "expense", "shopping",       "Amazon — Laptop Stand",         2199),
  tx("2026-11-04", "expense", "food",           "Zomato — Weekend Brunch",        950),
  tx("2026-11-04", "expense", "entertainment",  "Netflix Subscription",           649),
  tx("2026-11-03", "expense", "health",         "Apollo Pharmacy",               1240),
  tx("2026-11-02", "expense", "education",      "Udemy Course",                  1299),
  tx("2026-11-01", "expense", "transport",      "Metro Monthly Pass",            1200),
  tx("2026-11-01", "income",  "investment",     "Mutual Fund Dividend",          3200),

  // October 2026
  tx("2026-10-31", "income",  "salary",         "Monthly Salary — TechCorp",    95000),
  tx("2026-10-30", "expense", "rent",           "October Rent",                 22000),
  tx("2026-10-28", "expense", "food",           "Grocery — BigBasket",           4320),
  tx("2026-10-26", "income",  "freelance",      "Website Redesign — Client B",  22000),
  tx("2026-10-25", "expense", "shopping",       "Flipkart — Wireless Earbuds",   3999),
  tx("2026-10-24", "expense", "entertainment",  "Movie Tickets (2)",              800),
  tx("2026-10-22", "expense", "health",         "Gym Membership",               2500),
  tx("2026-10-20", "expense", "utilities",      "Internet Bill — Jio Fiber",    1199),
  tx("2026-10-18", "expense", "food",           "Office Canteen",                540),
  tx("2026-10-15", "income",  "investment",     "Stock Dividend — Infosys",     1800),
  tx("2026-10-12", "expense", "transport",      "Flight — Bangalore Trip",      7500),
  tx("2026-10-10", "expense", "education",      "Book — Clean Code",             599),
  tx("2026-10-08", "expense", "food",           "Restaurant — Birthday Dinner",  3200),
  tx("2026-10-05", "expense", "utilities",      "Water Bill",                    450),

  // September 2026
  tx("2026-09-30", "income",  "salary",         "Monthly Salary — TechCorp",    95000),
  tx("2026-09-29", "expense", "rent",           "September Rent",               22000),
  tx("2026-09-27", "expense", "shopping",       "Myntra — Clothing",             4800),
  tx("2026-09-25", "income",  "freelance",      "Logo Design — Client C",        8500),
  tx("2026-09-22", "expense", "food",           "Grocery — D-Mart",              3700),
  tx("2026-09-20", "expense", "health",         "Doctor Consultation",           800),
  tx("2026-09-18", "expense", "entertainment",  "Spotify Premium",               119),
  tx("2026-09-15", "expense", "utilities",      "Electricity Bill",             1920),
  tx("2026-09-12", "expense", "transport",      "Petrol — Monthly",             4200),
  tx("2026-09-10", "income",  "investment",     "Mutual Fund Return",            2600),
  tx("2026-09-05", "expense", "education",      "Online Course — AWS",          3499),
];

// ─── Monthly Summary (last 7 months) ─────────────────────────
export const MONTHLY_SUMMARY = [
  { month: "May",  income: 110000, expenses: 62000 },
  { month: "Jun",  income: 101000, expenses: 68000 },
  { month: "Jul",  income: 118000, expenses: 71000 },
  { month: "Aug",  income: 95000,  expenses: 59000 },
  { month: "Sep",  income: 106100, expenses: 69539 },
  { month: "Oct",  income: 118800, expenses: 48107 },
  { month: "Nov",  income: 116200, expenses: 28487 },
];

// ─── Category Breakdown (current month) ──────────────────────
export const CATEGORY_BREAKDOWN = [
  { category: "rent",          amount: 22000 },
  { category: "food",          amount: 1630  },
  { category: "transport",     amount: 1520  },
  { category: "utilities",     amount: 1850  },
  { category: "shopping",      amount: 2199  },
  { category: "health",        amount: 1240  },
  { category: "entertainment", amount: 649   },
  { category: "education",     amount: 1299  },
];

// ─── Budgets ──────────────────────────────────────────────────
export const SAMPLE_BUDGETS = [
  { id: "b1", category: "food",          limit: 8000,  spent: 1630,  period: "monthly" },
  { id: "b2", category: "transport",     limit: 5000,  spent: 1520,  period: "monthly" },
  { id: "b3", category: "shopping",      limit: 6000,  spent: 2199,  period: "monthly" },
  { id: "b4", category: "entertainment", limit: 2000,  spent: 649,   period: "monthly" },
  { id: "b5", category: "health",        limit: 3000,  spent: 1240,  period: "monthly" },
  { id: "b6", category: "utilities",     limit: 4000,  spent: 1850,  period: "monthly" },
  { id: "b7", category: "education",     limit: 5000,  spent: 1299,  period: "monthly" },
];

// ─── Financial Goals ──────────────────────────────────────────
export const SAMPLE_GOALS = [
  {
    id: "g1",
    name: "Emergency Fund",
    targetAmount: 300000,
    currentAmount: 185000,
    targetDate: "2027-03-31",
    icon: "Shield",
    color: "#3b82f6",
  },
  {
    id: "g2",
    name: "New Laptop",
    targetAmount: 120000,
    currentAmount: 72000,
    targetDate: "2027-01-15",
    icon: "Laptop",
    color: "#8b5cf6",
  },
  {
    id: "g3",
    name: "Goa Vacation",
    targetAmount: 60000,
    currentAmount: 22000,
    targetDate: "2027-04-01",
    icon: "Plane",
    color: "#f59e0b",
  },
  {
    id: "g4",
    name: "Home Down Payment",
    targetAmount: 1500000,
    currentAmount: 310000,
    targetDate: "2029-12-31",
    icon: "Home",
    color: "#10b981",
  },
];

// ─── Dashboard Stats ──────────────────────────────────────────
export const DASHBOARD_STATS = {
  totalBalance: 487250,
  monthlyIncome: 116200,
  monthlyExpenses: 28487,
  monthlySavings: 87713,
};
