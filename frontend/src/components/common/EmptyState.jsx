import { Inbox } from "lucide-react";

/**
 * EmptyState — shown when a list has no items.
 */
export default function EmptyState({ title = "No data yet", message, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="p-4 bg-slate-100 rounded-full">
        <Inbox size={32} className="text-slate-400" />
      </div>
      <div>
        <p className="text-base font-medium text-slate-700">{title}</p>
        {message && <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">{message}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
