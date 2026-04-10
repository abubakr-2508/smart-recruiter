import { useState } from "react";
import { Search, Download } from "lucide-react";
import { auditLogs } from "../data/mockData";

export function AuditLog() {
  const [search, setSearch] = useState("");

  const filtered = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.detail.toLowerCase().includes(search.toLowerCase())
  );

  const actionColor: Record<string, string> = {
    "Candidate Shortlisted": "text-emerald-700 bg-emerald-50 border-emerald-200",
    "Job Published": "text-blue-700 bg-blue-50 border-blue-200",
    "Import Completed": "text-teal-700 bg-teal-50 border-teal-200",
    "Portal Reconnected": "text-purple-700 bg-purple-50 border-purple-200",
    "Candidate Rejected": "text-red-600 bg-red-50 border-red-200",
    "Review Queue Actioned": "text-orange-700 bg-orange-50 border-orange-200",
    "Export Generated": "text-slate-600 bg-slate-50 border-slate-200",
    "Email Ingestion Triggered": "text-indigo-700 bg-indigo-50 border-indigo-200",
  };

  return (
    <div className="space-y-5">
      <p className="text-slate-500 text-sm">Full audit trail of all system actions and user operations.</p>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit log..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 bg-slate-50 focus:outline-none">
          <option>All Users</option>
          <option>Mayda</option>
          <option>Sarah Miller</option>
          <option>James Cooper</option>
          <option>System</option>
        </select>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 bg-slate-50 focus:outline-none">
          <option>All Time</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
        <button className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors ml-auto">
          <Download size={14} /> Export Log
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {["Timestamp", "Action", "User", "Source", "Detail"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3.5">
                  <span className="text-xs text-slate-500 font-mono">{log.timestamp}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${actionColor[log.action] || "text-slate-600 bg-slate-50 border-slate-200"}`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-600">{log.user}</td>
                <td className="px-5 py-3.5 text-xs text-slate-500">{log.source}</td>
                <td className="px-5 py-3.5 text-xs text-slate-600 max-w-xs truncate">{log.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-400 text-sm">No log entries match your search.</p>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-slate-400">
        Showing {filtered.length} of {auditLogs.length} total audit entries
      </p>
    </div>
  );
}