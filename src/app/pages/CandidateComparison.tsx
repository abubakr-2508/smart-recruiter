import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle, XCircle, Star } from "lucide-react";
import { candidates } from "../data/mockData";

export function CandidateComparison() {
  const navigate = useNavigate();

  // Pick top 3 shortlisted candidates
  const compared = candidates.filter((c) => c.status === "Shortlisted").slice(0, 3);

  const rows = [
    { key: "score", label: "Overall Score", render: (c: typeof compared[0]) => (
      <span className={`text-xl font-bold ${c.score >= 85 ? "text-emerald-600" : "text-amber-600"}`}>{c.score}%</span>
    )},
    { key: "primary", label: "Primary Match", render: (c: typeof compared[0]) => (
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className={`text-sm font-semibold ${c.primaryMatch >= 85 ? "text-emerald-600" : "text-amber-600"}`}>{c.primaryMatch}%</span>
        </div>
        <div className="bg-slate-100 rounded-full h-1.5 w-full">
          <div className={`h-1.5 rounded-full ${c.primaryMatch >= 85 ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: `${c.primaryMatch}%` }} />
        </div>
      </div>
    )},
    { key: "secondary", label: "Secondary Match", render: (c: typeof compared[0]) => (
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className={`text-sm font-semibold ${c.secondaryMatch >= 85 ? "text-emerald-600" : "text-amber-600"}`}>{c.secondaryMatch}%</span>
        </div>
        <div className="bg-slate-100 rounded-full h-1.5 w-full">
          <div className={`h-1.5 rounded-full ${c.secondaryMatch >= 85 ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: `${c.secondaryMatch}%` }} />
        </div>
      </div>
    )},
    { key: "experience", label: "Experience", render: (c: typeof compared[0]) => (
      <span className="text-sm text-slate-700">{c.experience}</span>
    )},
    { key: "education", label: "Education", render: (c: typeof compared[0]) => (
      <span className="text-xs text-slate-600 leading-relaxed">{c.education}</span>
    )},
    { key: "certifications", label: "Certifications", render: (c: typeof compared[0]) => (
      c.certifications.length > 0 ? (
        <div className="flex flex-col gap-1">
          {c.certifications.map((cert) => (
            <span key={cert} className="text-[11px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md">{cert}</span>
          ))}
        </div>
      ) : <span className="text-xs text-slate-400">None listed</span>
    )},
    { key: "primarySkills", label: "Primary Skills", render: (c: typeof compared[0]) => (
      <div className="flex flex-wrap gap-1">
        {c.primarySkills.matched.map(s => (
          <span key={s} className="inline-flex items-center gap-0.5 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-md">
            <CheckCircle size={9} /> {s}
          </span>
        ))}
        {c.primarySkills.missing.map(s => (
          <span key={s} className="inline-flex items-center gap-0.5 text-[11px] bg-red-50 text-red-600 border border-red-200 px-1.5 py-0.5 rounded-md">
            <XCircle size={9} /> {s}
          </span>
        ))}
      </div>
    )},
    { key: "secondarySkills", label: "Secondary Skills", render: (c: typeof compared[0]) => (
      <div className="flex flex-wrap gap-1">
        {c.secondarySkills.matched.map(s => (
          <span key={s} className="inline-flex items-center gap-0.5 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-md">
            <CheckCircle size={9} /> {s}
          </span>
        ))}
        {c.secondarySkills.missing.map(s => (
          <span key={s} className="inline-flex items-center gap-0.5 text-[11px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md">
            <XCircle size={9} /> {s}
          </span>
        ))}
      </div>
    )},
    { key: "source", label: "Source", render: (c: typeof compared[0]) => (
      <span className="text-xs text-teal-600 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">{c.source}</span>
    )},
    { key: "notes", label: "Recruiter Notes", render: (c: typeof compared[0]) => (
      <p className="text-[11px] text-slate-600 leading-relaxed">{c.recruiterNotes}</p>
    )},
  ];

  return (
    <div className="space-y-4">
      <button onClick={() => navigate("/shortlist")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={14} /> Shortlist
      </button>

      <p className="text-slate-500 text-sm">Comparing top {compared.length} shortlisted candidates side by side.</p>

      {/* Comparison table */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-5 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide w-40 bg-slate-50/50">
                Criteria
              </th>
              {compared.map((c, i) => (
                <th key={c.id} className="px-5 py-4 text-left border-l border-slate-50">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      i === 0 ? "bg-amber-100" : i === 1 ? "bg-slate-100" : "bg-orange-100"
                    }`}>
                      <span className="font-bold text-sm">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{c.currentRole}</p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-3.5 bg-slate-50/30">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{row.label}</span>
                </td>
                {compared.map((c) => (
                  <td key={c.id} className="px-5 py-3.5 border-l border-slate-50">
                    {row.render(c)}
                  </td>
                ))}
              </tr>
            ))}
            {/* Actions row */}
            <tr className="bg-slate-50/30">
              <td className="px-5 py-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</span>
              </td>
              {compared.map((c) => (
                <td key={c.id} className="px-5 py-4 border-l border-slate-50">
                  <div className="flex flex-col gap-1.5">
                    <button className="flex items-center justify-center gap-1.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors">
                      <Star size={11} /> Shortlist
                    </button>
                    <button
                      onClick={() => navigate(`/jobs/${c.jobId}/applications/${c.id}`)}
                      className="flex items-center justify-center gap-1.5 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-slate-50 transition-colors"
                    >
                      View Profile
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
