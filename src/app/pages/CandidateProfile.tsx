import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Download,
  Star,
  FileText,
  MessageSquare,
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Briefcase,
  ChevronDown,
  FileType,
} from "lucide-react";
import { candidates, jobs } from "../data/mockData";
import { ScoreBadge, StatusBadge } from "../components/ui/Badge";
import { useState, useRef, useEffect } from "react";

export function CandidateProfile() {
  const { id, candidateId } = useParams();
  const navigate = useNavigate();
  const candidate = candidates.find((c) => c.id === candidateId) || candidates[0];
  const job = jobs.find((j) => j.id === id) || jobs[0];
  const [note, setNote] = useState(candidate.recruiterNotes);
  const [editingNote, setEditingNote] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [downloaded, setDownloaded] = useState<string | null>(null);
  const downloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (downloadRef.current && !downloadRef.current.contains(e.target as Node)) {
        setShowDownload(false);
      }
    }
    if (showDownload) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDownload]);

  function handleDownload(type: "pdf" | "docx") {
    setDownloaded(type);
    setShowDownload(false);
    setTimeout(() => setDownloaded(null), 3000);
  }

  const scoreBreakdown = [
    { label: "Primary Skills", score: candidate.primaryMatch, weight: "60%" },
    { label: "Secondary Skills", score: candidate.secondaryMatch, weight: "25%" },
    { label: "Experience & Education", score: candidate.otherScore, weight: "15%" },
  ];

  return (
    <div className="space-y-4 max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button onClick={() => navigate("/jobs")} className="text-slate-500 hover:text-slate-700">Jobs</button>
        <span className="text-slate-300">/</span>
        <button onClick={() => navigate(`/jobs/${job.id}/applications`)} className="text-slate-500 hover:text-slate-700">{job.title}</button>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-medium">{candidate.name}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0f2240]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#0f2240] text-xl font-bold">
                {candidate.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">{candidate.name}</h1>
              <p className="text-sm text-slate-500 mt-0.5">{candidate.currentRole}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1"><MapPin size={11} /> {candidate.location}</span>
                <span className="flex items-center gap-1"><Briefcase size={11} /> {candidate.experience}</span>
                <span className="flex items-center gap-1"><Mail size={11} /> {candidate.email}</span>
                <span className="flex items-center gap-1"><Phone size={11} /> {candidate.phone}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={candidate.status} />
            <div className="text-right">
              <ScoreBadge score={candidate.score} />
              <p className="text-[11px] text-slate-400 mt-1">Overall Match</p>
            </div>
          </div>
        </div>
        
        {/* Score bar */}
        <div className="mt-4 pt-4 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  candidate.score >= 85 ? "bg-emerald-500" : candidate.score >= 70 ? "bg-amber-500" : "bg-red-400"
                }`}
                style={{ width: `${candidate.score}%` }}
              />
            </div>
            <span className={`text-2xl font-bold ${
              candidate.score >= 85 ? "text-emerald-600" : candidate.score >= 70 ? "text-amber-600" : "text-red-500"
            }`}>{candidate.score}%</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 mt-4 items-center">
          {candidate.status !== "Shortlisted" && (
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
              <Star size={14} /> Shortlist Candidate
            </button>
          )}
          {candidate.status === "Shortlisted" && (
            <button onClick={() => navigate("/shortlist")} className="flex items-center gap-2 px-4 py-2 bg-[#0f2240] text-white rounded-lg text-sm font-medium hover:bg-[#1a3460] transition-colors">
              <Star size={14} /> View in Shortlist
            </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 bg-red-50 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
            <XCircle size={14} /> Reject
          </button>

          {/* Download Profile dropdown */}
          <div className="relative ml-auto" ref={downloadRef}>
            <button
              onClick={() => setShowDownload((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                showDownload
                  ? "border-indigo-300 bg-indigo-50 text-indigo-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Download size={14} /> Download Profile <ChevronDown size={13} className={`transition-transform ${showDownload ? "rotate-180" : ""}`} />
            </button>

            {showDownload && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl border border-slate-200 shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Export Profile As</p>
                </div>
                {/* PDF */}
                <button
                  onClick={() => handleDownload("pdf")}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <FileText size={16} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">PDF Report</p>
                    <p className="text-xs text-slate-400">Formatted profile · .pdf</p>
                  </div>
                </button>
                {/* DOCX */}
                <button
                  onClick={() => handleDownload("docx")}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left group border-t border-slate-50"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <FileType size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Word Document</p>
                    <p className="text-xs text-slate-400">Editable report · .docx</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Left col */}
        <div className="col-span-2 space-y-4">
          {/* AI Explanation */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-teal-100 rounded-lg flex items-center justify-center">
                <span className="text-teal-600 text-[11px] font-bold">AI</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-800">AI Score Explanation</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{candidate.aiExplanation}</p>
          </div>

          {/* Score Breakdown */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Score Breakdown</h3>
            <div className="space-y-3.5">
              {scoreBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-700">{item.label}</span>
                      <span className="text-[11px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Weight: {item.weight}</span>
                    </div>
                    <span className={`text-sm font-bold ${
                      item.score >= 85 ? "text-emerald-600" : item.score >= 70 ? "text-amber-600" : "text-red-500"
                    }`}>{item.score}%</span>
                  </div>
                  <div className="bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.score >= 85 ? "bg-emerald-500" : item.score >= 70 ? "bg-amber-500" : "bg-red-400"
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Skills Analysis</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Primary Skills</h4>
                  <span className="text-[11px] bg-[#0f2240]/10 text-[#0f2240] px-1.5 py-0.5 rounded">High weight</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.primarySkills.matched.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-medium">
                      <CheckCircle size={10} /> {s}
                    </span>
                  ))}
                  {candidate.primarySkills.missing.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-md text-xs font-medium">
                      <XCircle size={10} /> {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Secondary Skills</h4>
                  <span className="text-[11px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Normal weight</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.secondarySkills.matched.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-medium">
                      <CheckCircle size={10} /> {s}
                    </span>
                  ))}
                  {candidate.secondarySkills.missing.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-500 border border-slate-200 rounded-md text-xs font-medium">
                      <XCircle size={10} /> {s} <span className="text-slate-400">(missing)</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-800">Resume</h3>
              <button className="flex items-center gap-1 text-xs text-teal-600 font-medium hover:underline">
                <Download size={11} /> Download
              </button>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 text-center">
              <FileText size={32} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-400">Resume preview — {candidate.name.toLowerCase().replace(" ", "_")}_resume.pdf</p>
              <p className="text-xs text-slate-300 mt-1">Applied {candidate.appliedDate}</p>
            </div>
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-4">
          {/* Experience / Education */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Background</h3>
            <div className="space-y-3">
              {[
                { label: "Current Role", value: candidate.currentRole },
                { label: "Experience", value: candidate.experience },
                { label: "Education", value: candidate.education },
                { label: "Certifications", value: candidate.certifications.length > 0 ? candidate.certifications.join(", ") : "None listed" },
                { label: "Location", value: candidate.location },
              ].map((item) => (
                <div key={item.label} className="pb-2 border-b border-slate-50 last:border-b-0">
                  <p className="text-[11px] text-slate-400 uppercase tracking-wide">{item.label}</p>
                  <p className="text-xs text-slate-700 mt-0.5 font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Source */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Source History</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-slate-700">Applied via</p>
                  <p className="text-[11px] text-slate-400">{candidate.source}</p>
                </div>
                <span className="text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">{candidate.source}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-slate-700">Applied date</p>
                  <p className="text-[11px] text-slate-400">{candidate.appliedDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <MessageSquare size={14} /> Recruiter Notes
              </h3>
              <button onClick={() => setEditingNote(!editingNote)} className="text-xs text-teal-600 hover:underline">
                {editingNote ? "Save" : "Edit"}
              </button>
            </div>
            {editingNote ? (
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-xs text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">{note}</p>
            )}
          </div>
        </div>
      </div>

      {/* Download success toast */}
      {downloaded && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0f2240] text-white px-5 py-3.5 rounded-xl shadow-2xl animate-fade-in">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            {downloaded === "pdf" ? <FileText size={14} className="text-red-300" /> : <FileType size={14} className="text-blue-300" />}
          </div>
          <div>
            <p className="text-sm font-semibold">Download started</p>
            <p className="text-xs text-white/60">{candidate.name} — {downloaded.toUpperCase()} report</p>
          </div>
        </div>
      )}
    </div>
  );
}