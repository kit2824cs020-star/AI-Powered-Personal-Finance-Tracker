import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, ArrowLeftRight, PieChart, Target,
  BarChart3, Settings, LogOut, TrendingUp, X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { to: "/dashboard",    label: "Dashboard",     icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions",  icon: ArrowLeftRight },
  { to: "/budgets",      label: "Budgets",        icon: PieChart },
  { to: "/goals",        label: "Goals",          icon: Target },
  { to: "/reports",      label: "Reports",        icon: BarChart3 },
  { to: "/settings",     label: "Settings",       icon: Settings },
];

/**
 * Sidebar — desktop persistent left navigation + mobile overlay.
 */
export default function Sidebar({ mobileOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const NavItem = ({ to, label, Icon }) => (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "bg-blue-50 text-blue-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-800",
        ].join(" ")
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );

  const content = (
    <aside className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className="text-base font-bold text-slate-800">FinanceAI</span>
        </div>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavItem key={to} to={to} label={label} Icon={Icon} />
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-slate-200 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
            {user?.name?.charAt(0) ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{user?.name ?? "User"}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email ?? ""}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-64 flex-shrink-0 h-screen sticky top-0">
        {content}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="relative z-50 flex flex-col w-64">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
