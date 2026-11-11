import EmptyState from "./EmptyState";

/**
 * DataTable — responsive table with sorting-ready headers and empty state.
 * @param {Array}  columns  - [{ key, label, render?, align? }]
 * @param {Array}  data     - rows array
 * @param {string} rowKey   - property used as React key
 */
export default function DataTable({
  columns = [],
  data = [],
  rowKey = "id",
  emptyTitle = "No records found",
  emptyMessage,
  className = "",
}) {
  if (data.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <div className={`overflow-x-auto rounded-lg border border-slate-200 ${className}`}>
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={[
                  "px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap",
                  col.align === "right" ? "text-right" : "",
                  col.align === "center" ? "text-center" : "",
                ].join(" ")}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => (
            <tr
              key={row[rowKey]}
              className="hover:bg-slate-50 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={[
                    "px-4 py-3 text-slate-700 whitespace-nowrap",
                    col.align === "right" ? "text-right" : "",
                    col.align === "center" ? "text-center" : "",
                  ].join(" ")}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
