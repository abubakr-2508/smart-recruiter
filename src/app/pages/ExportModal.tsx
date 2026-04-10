import { useState } from "react";
import { X, Download, FileText, FileSpreadsheet, CheckCircle } from "lucide-react";

type Props = {
  onClose: () => void;
  jobTitle: string;
  candidateCount: number;
};

export function ExportModal({ onClose, jobTitle, candidateCount }: Props) {
  const [format, setFormat] = useState<"pdf" | "csv">("pdf");
  const [scope, setScope] = useState<"shortlisted" | "all">("shortlisted");
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setDone(true);
      setTimeout(onClose, 1500);
    }, 1500);
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">Export Candidates</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {done ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <p className="text-sm font-semibold text-slate-800">Export ready!</p>
              <p className="text-xs text-slate-400 mt-1">Your file is downloading...</p>
            </div>
          ) : (
            <>
              {/* Job info */}
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-400">Exporting from</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{jobTitle}</p>
              </div>

              {/* Scope */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                  Which candidates to include
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: "shortlisted", label: `Shortlisted only`, sub: `${candidateCount} candidates ≥85%` },
                    { val: "all", label: "All ≥70%", sub: "All candidates above threshold" },
                  ].map((s) => (
                    <button
                      key={s.val}
                      onClick={() => setScope(s.val as typeof scope)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        scope === s.val
                          ? "border-teal-400 bg-teal-50/50 ring-1 ring-teal-400/30"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <p className="text-xs font-semibold text-slate-700">{s.label}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{s.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                  Export format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: "pdf", label: "PDF Report", icon: FileText, sub: "Formatted candidate report" },
                    { val: "csv", label: "CSV Data", icon: FileSpreadsheet, sub: "Raw data for analysis" },
                  ].map((f) => (
                    <button
                      key={f.val}
                      onClick={() => setFormat(f.val as typeof format)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        format === f.val
                          ? "border-teal-400 bg-teal-50/50 ring-1 ring-teal-400/30"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <f.icon size={18} className={format === f.val ? "text-teal-600" : "text-slate-400"} />
                      <div>
                        <p className="text-xs font-semibold text-slate-700">{f.label}</p>
                        <p className="text-[11px] text-slate-400">{f.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleExport}
                disabled={exporting}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0f2240] text-white rounded-xl text-sm font-medium hover:bg-[#1a3460] transition-colors disabled:opacity-70"
              >
                {exporting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  <>
                    <Download size={14} /> Export {format.toUpperCase()}
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
