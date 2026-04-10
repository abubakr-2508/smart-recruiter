import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, XCircle, Merge, Briefcase, FileText, AlertTriangle } from "lucide-react";
import { reviewQueue } from "../data/mockData";

export function ReviewQueue() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(reviewQueue[0]);
  const [actioned, setActioned] = useState<string[]>([]);

  function action(id: string) {
    setActioned((prev) => [...prev, id]);
    const remaining = reviewQueue.filter((r) => !actioned.includes(r.id) && r.id !== id);
    if (remaining.length > 0) setSelected(remaining[0]);
  }

  const pending = reviewQueue.filter((r) => !actioned.includes(r.id));

  return (
    <div className="space-y-4 max-w-6xl">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate("/imports")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft size={14} /> Import Center
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{pending.length} items remaining</span>
        </div>
      </div>

      {pending.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-16 text-center">
          <CheckCircle size={40} className="text-emerald-400 mx-auto mb-4" />
          <h2 className="text-base font-semibold text-slate-800 mb-2">All items reviewed!</h2>
          <p className="text-sm text-slate-500 mb-5">The review queue is clear. All candidates have been actioned.</p>
          <button onClick={() => navigate("/applications")} className="px-4 py-2 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460]">View Applications</button>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {/* List */}
          <div className="col-span-2 bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-50">
              <h3 className="text-sm font-semibold text-slate-800">Review Queue</h3>
              <p className="text-xs text-slate-400 mt-0.5">{pending.length} items need attention</p>
            </div>
            <div>
              {reviewQueue.map((item) => {
                const isDone = actioned.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => !isDone && setSelected(item)}
                    disabled={isDone}
                    className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-slate-50 text-left transition-colors ${
                      isDone ? "opacity-40 cursor-not-allowed" :
                      selected.id === item.id ? "bg-[#0f2240]/5" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.confidence >= 70 ? "bg-amber-100" : "bg-red-100"
                    }`}>
                      <AlertTriangle size={14} className={item.confidence >= 70 ? "text-amber-600" : "text-red-500"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-800">{item.candidateName}</p>
                        <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${
                          item.confidence >= 70 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"
                        }`}>{item.confidence}%</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.reason}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.source} · {item.date}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail / Preview */}
          <div className="col-span-3 space-y-4">
            <div className="bg-white rounded-xl border border-slate-100 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-800">{selected.candidateName}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selected.file} · {selected.source}</p>
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-lg ${
                  selected.confidence >= 70 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"
                }`}>
                  {selected.confidence}% Confidence
                </span>
              </div>

              <div className="p-3.5 bg-orange-50 border border-orange-200 rounded-xl mb-4 flex items-start gap-2.5">
                <AlertTriangle size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-orange-700">{selected.reason}</p>
              </div>

              {/* Extracted data */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Extracted Data</h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {Object.entries(selected.extractedData).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 rounded-lg p-3">
                      <p className="text-[11px] text-slate-400 capitalize">{key}</p>
                      <p className="text-xs font-medium text-slate-700 mt-0.5">
                        {Array.isArray(value) ? value.join(", ") : value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume preview placeholder */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50 flex items-center justify-center gap-2.5 mb-4">
                <FileText size={16} className="text-slate-300" />
                <span className="text-sm text-slate-400">Resume preview: {selected.file}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Assign to Job</label>
                  <select className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none">
                    <option>Senior Software Engineer (JOB001)</option>
                    <option>Product Manager (JOB002)</option>
                    <option>Data Scientist (JOB003)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => action(selected.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                <CheckCircle size={15} /> Approve & Import
              </button>
              <button
                onClick={() => action(selected.id)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                <Merge size={15} /> Merge
              </button>
              <button
                onClick={() => action(selected.id)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors"
              >
                <XCircle size={15} /> Reject
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-sm hover:bg-slate-50 transition-colors">
                <Briefcase size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
