import { useState } from "react";
import { useNavigate } from "react-router";
import { Star, Eye, CheckCircle, XCircle, GitCompare, Download } from "lucide-react";
import { candidates, jobs } from "../data/mockData";
import { ExportModal } from "./ExportModal";

export function ShortlistView() {
  const navigate = useNavigate();
  const [showExport, setShowExport] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const shortlisted = candidates
    .filter((c) => c.status === "Shortlisted")
    .sort((a, b) => b.score - a.score);

  function toggleSelect(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">
            {shortlisted.length} shortlisted candidate{shortlisted.length !== 1 ? "s" : ""} — all above 85% match
          </p>
        </div>
        <div className="flex gap-2.5">
          {selected.length >= 2 && (
            <button
              onClick={() => navigate("/shortlist/compare")}
              className="flex items-center gap-2 px-4 py-2 border border-teal-300 text-teal-700 bg-teal-50 rounded-lg text-sm font-medium hover:bg-teal-100 transition-colors"
            >
              <GitCompare size={14} /> Compare {selected.length} Candidates
            </button>
          )}
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460] transition-colors"
          >
            <Download size={14} /> Export Shortlist
          </button>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-700 flex items-center gap-2">
          <GitCompare size={13} />
          {selected.length < 2
            ? `Select ${2 - selected.length} more candidate${2 - selected.length !== 1 ? "s" : ""} to compare`
            : `${selected.length} candidates selected for comparison. Click "Compare" to proceed.`}
        </div>
      )}

      {/* Ranked list */}
      <div className="space-y-3">
        {shortlisted.map((c, idx) => {
          const isSelected = selected.includes(c.id);
          return (
            <div
              key={c.id}
              className={`bg-white rounded-xl border transition-all ${
                isSelected ? "border-teal-400 ring-2 ring-teal-400/20" : "border-slate-100 hover:border-slate-200"
              } p-5`}
            >
              <div className="flex items-start gap-4">
                {/* Rank */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg ${
                  idx === 0 ? "bg-amber-100 text-amber-600" :
                  idx === 1 ? "bg-slate-100 text-slate-500" :
                  idx === 2 ? "bg-orange-100 text-orange-500" :
                  "bg-slate-50 text-slate-400"
                }`}>
                  #{idx + 1}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-xl bg-[#0f2240]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#0f2240] text-sm font-bold">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <h3 className="text-sm font-semibold text-slate-800">{c.name}</h3>
                    <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                      <Star size={10} /> Shortlisted
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{c.currentRole}</p>
                  
                  {/* Score bars */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Overall", val: c.score },
                      { label: "Primary", val: c.primaryMatch },
                      { label: "Secondary", val: c.secondaryMatch },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] text-slate-400">{s.label}</span>
                          <span className={`text-xs font-bold ${
                            s.val >= 85 ? "text-emerald-600" : "text-amber-600"
                          }`}>{s.val}%</span>
                        </div>
                        <div className="bg-slate-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${s.val >= 85 ? "bg-emerald-500" : "bg-amber-500"}`}
                            style={{ width: `${s.val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Top reasons */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.primarySkills.matched.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-[11px] bg-[#0f2240]/10 text-[#0f2240] px-2 py-0.5 rounded-md font-medium">
                        ✓ {skill}
                      </span>
                    ))}
                    <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{c.experience}</span>
                    <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{c.source}</span>
                  </div>
                </div>

                {/* Score + Actions */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <div className={`text-3xl font-bold ${
                    c.score >= 85 ? "text-emerald-600" : "text-amber-600"
                  }`}>{c.score}%</div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSelect(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isSelected
                          ? "bg-teal-50 text-teal-700 border-teal-300"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {isSelected ? "✓ Selected" : "Compare"}
                    </button>
                    <button
                      onClick={() => navigate(`/jobs/${c.jobId}/applications/${c.id}`)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#0f2240] text-white rounded-lg text-xs hover:bg-[#1a3460] transition-colors"
                    >
                      <Eye size={12} /> Profile
                    </button>
                  </div>

                  <div className="flex gap-1">
                    <button className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] hover:bg-emerald-100 transition-colors">
                      <CheckCircle size={10} /> Approve
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-[11px] hover:bg-red-100 transition-colors">
                      <XCircle size={10} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showExport && (
        <ExportModal
          onClose={() => setShowExport(false)}
          jobTitle={jobs[0].title}
          candidateCount={shortlisted.length}
        />
      )}
    </div>
  );
}