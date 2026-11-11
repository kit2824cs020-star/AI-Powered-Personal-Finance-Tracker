import { TrendingUp } from "lucide-react";
import { Outlet } from "react-router-dom";

/**
 * AuthLayout — centered card layout for login and register pages.
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-800">FinanceAI</span>
              <p className="text-xs text-slate-500 leading-none">Personal Finance Tracker</p>
            </div>
          </div>
        </div>
        {/* Page content */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <Outlet />
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">
          Demo application — no real data is stored or transmitted.
        </p>
      </div>
    </div>
  );
}
