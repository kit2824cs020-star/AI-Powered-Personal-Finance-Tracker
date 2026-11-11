import { AlertTriangle } from "lucide-react";
import Button from "./Button";

/**
 * ErrorState — shown on data fetch failures or unexpected errors.
 */
export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="p-4 bg-red-50 rounded-full">
        <AlertTriangle size={32} className="text-red-500" />
      </div>
      <div>
        <p className="text-base font-medium text-slate-700">{title}</p>
        <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">{message}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
