import { Menu, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

const PAGE_TITLES = {
  "/dashboard":    "Dashboard",
  "/transactions": "Transactions",
  "/budgets":      "Budgets",
  "/goals":        "Financial Goals",
  "/reports":      "Reports",
  "/settings":     "Settings",
};

/**
 * Navbar — top bar shown on mobile and as a top strip on desktop.
 */
export default function Navbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] ?? "FinanceAI";

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center px-4 gap-4">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <h2 className="text-base font-semibold text-slate-800 flex-1 lg:pl-0">{title}</h2>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
        </button>
        <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">
          R
        </div>
      </div>
    </header>
  );
}
