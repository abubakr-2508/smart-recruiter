import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Download,
  Eye,
  ChevronUp,
  ToggleLeft,
  ToggleRight,
  X,
  ChevronDown,
} from "lucide-react";
import { jobs, candidates } from "../data/mockData";
import { ScoreBadge, StatusBadge } from "../components/ui/Badge";
import { ExportModal } from "./ExportModal";

type Tab = "All" | "Shortlisted" | "Under Review" | "Rejected";

const ALL_SOURCES = ["LinkedIn", "Indeed", "Direct Apply", "Manual Upload", "Email", "ZipRecruiter"];
const EXP_OPTIONS = [
  { label: "Any", value: 0 },
  { label: "1+ yr", value: 1 },
  { label: "2+ yrs", value: 2 },
  { label: "3+ yrs", value: 3 },
  { label: "5+ yrs", value: 5 },
  { label: "7+ yrs", value: 7 },
  { label: "10+ yrs", value: 10 },
];

function parseExp(exp: string) {
  const n = parseInt(exp);
  return isNaN(n) ? 0 : n;
}

export function Applications() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = id ? jobs.find((j) => j.id === id) || jobs[0] : jobs[0];

  const [tab, setTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showExport, setShowExport] = useState(false);

  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrimaryMatch, setMinPrimaryMatch] = useState(0);
  const [minSecondaryMatch, setMinSecondaryMatch] = useState(0);
  const [minExperience, setMinExperience] = useState(0);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  // Temp state while dropdown is open (apply on click)
  const [tempPrimary, setTempPrimary] = useState(0);
  const [tempSecondary, setTempSecondary] = useState(0);
  const [tempExp, setTempExp] = useState(0);
  const [tempSources, setTempSources] = useState<string[]>([]);

  const filterRef = useRef<HTMLDivElement>(null);

  // Sync temp state when dropdown opens
  useEffect(() => {
    if (filterOpen) {
      setTempPrimary(minPrimaryMatch);
      setTempSecondary(minSecondaryMatch);
      setTempExp(minExperience);
      setTempSources(selectedSources);
    }
  }, [filterOpen]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [filterOpen]);

  const activeFilterCount = [
    minPrimaryMatch > 0,
    minSecondaryMatch > 0,
    minExperience > 0,
    selectedSources.length > 0,
  ].filter(Boolean).length;

  const tabCandidates = candidates.filter((c) => {
    if (tab === "Shortlisted") return c.status === "Shortlisted";
    if (tab === "Under Review") return c.status === "Under Review";
    if (tab === "Rejected") return c.status === "Rejected";
    return true;
  });

  const filtered = tabCandidates
    .filter((c) => {
      const matchSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.currentRole.toLowerCase().includes(search.toLowerCase());
      const meetsThreshold = showAll || c.score >= 70;
      const meetsPrimary = c.primaryMatch >= minPrimaryMatch;
      const meetsSecondary = c.secondaryMatch >= minSecondaryMatch;
      const meetsExp = parseExp(c.experience) >= minExperience;
      const meetsSource = selectedSources.length === 0 || selectedSources.includes(c.source);
      return matchSearch && meetsThreshold && meetsPrimary && meetsSecondary && meetsExp && meetsSource;
    })
    .sort((a, b) => b.score - a.score);

  const tabs: Tab[] = ["All", "Shortlisted", "Under Review", "Rejected"];
  const tabCounts: Record<Tab, number> = {
    All: candidates.length,
    Shortlisted: candidates.filter((c) => c.status === "Shortlisted").length,
    "Under Review": candidates.filter((c) => c.status === "Under Review").length,
    Rejected: candidates.filter((c) => c.status === "Rejected").length,
  };

  function applyFilters() {
    setMinPrimaryMatch(tempPrimary);
    setMinSecondaryMatch(tempSecondary);
    setMinExperience(tempExp);
    setSelectedSources(tempSources);
    setFilterOpen(false);
  }

  function clearAll() {
    setTempPrimary(0);
    setTempSecondary(0);
    setTempExp(0);
    setTempSources([]);
    setMinPrimaryMatch(0);
    setMinSecondaryMatch(0);
    setMinExperience(0);
    setSelectedSources([]);
    setFilterOpen(false);
  }

  function toggleSource(src: string) {
    setTempSources((prev) =>
      prev.includes(src) ? prev.filter((s) => s !== src) : [...prev, src]
    );
  }

  function removeFilter(type: string) {
    if (type === "primary") setMinPrimaryMatch(0);
    if (type === "secondary") setMinSecondaryMatch(0);
    if (type === "experience") setMinExperience(0);
    if (type === "source") setSelectedSources([]);
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        {id ? (
          <>
            <button onClick={() => navigate("/jobs")} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700">
              <ArrowLeft size={14} /> Job Openings
            </button>
            <span className="text-slate-300">/</span>
            <button onClick={() => navigate(`/jobs/${id}`)} className="text-slate-500 hover:text-slate-700">{job.title}</button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-medium">Applications</span>
          </>
        ) : (
          <span className="text-slate-800 font-medium">All Applications</span>
        )}
      </div>

      {/* Header stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Applications", value: candidates.length, color: "text-slate-800", bg: "border-slate-100" },
          { label: "Shortlisted (≥85%)", value: tabCounts["Shortlisted"], color: "text-emerald-600", bg: "border-emerald-100" },
          { label: "Under Review", value: tabCounts["Under Review"], color: "text-amber-600", bg: "border-amber-100" },
          { label: "Rejected", value: tabCounts["Rejected"], color: "text-red-500", bg: "border-red-100" },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-xl border ${s.bg} p-4`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters row */}
      <div className="bg-white rounded-xl border border-slate-100 p-3 flex items-center gap-3">
        {/* Tabs */}
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                tab === t ? "bg-[#0f2240] text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t}
              <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${
                tab === t ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              }`}>{tabCounts[t]}</span>
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-slate-100" />

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          {/* Show all toggle */}
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {showAll ? <ToggleRight size={14} className="text-teal-500" /> : <ToggleLeft size={14} className="text-slate-400" />}
            {showAll ? "Showing all" : "≥70% only"}
          </button>

          {/* Filters button with dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors ${
                activeFilterCount > 0
                  ? "border-indigo-300 bg-indigo-50 text-indigo-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={12} />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown size={11} className={`transition-transform ${filterOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown panel */}
            {filterOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-800">Filter Candidates</span>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="p-4 space-y-5">
                  {/* Primary Skill Match */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-700">Primary Skill Match</label>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        ≥ {tempPrimary}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={tempPrimary}
                      onChange={(e) => setTempPrimary(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-indigo-500"
                      style={{ background: `linear-gradient(to right, #6366f1 ${tempPrimary}%, #e2e8f0 ${tempPrimary}%)` }}
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>0%</span><span>50%</span><span>100%</span>
                    </div>
                  </div>

                  {/* Secondary Skill Match */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-700">Secondary Skill Match</label>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        ≥ {tempSecondary}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={tempSecondary}
                      onChange={(e) => setTempSecondary(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-indigo-500"
                      style={{ background: `linear-gradient(to right, #6366f1 ${tempSecondary}%, #e2e8f0 ${tempSecondary}%)` }}
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>0%</span><span>50%</span><span>100%</span>
                    </div>
                  </div>

                  {/* Min Experience */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-2">Minimum Experience</label>
                    <div className="flex flex-wrap gap-1.5">
                      {EXP_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setTempExp(opt.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                            tempExp === opt.value
                              ? "bg-indigo-500 border-indigo-500 text-white"
                              : "border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Source */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-2">Source</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {ALL_SOURCES.map((src) => (
                        <label
                          key={src}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border cursor-pointer transition-colors text-xs ${
                            tempSources.includes(src)
                              ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                              : "border-slate-200 text-slate-600 hover:border-indigo-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={tempSources.includes(src)}
                            onChange={() => toggleSource(src)}
                            className="accent-indigo-500 w-3 h-3 flex-shrink-0"
                          />
                          {src}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={clearAll}
                    className="text-xs text-slate-500 hover:text-slate-700 font-medium transition-colors"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={applyFilters}
                    className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f2240] text-white rounded-lg text-xs hover:bg-[#1a3460] transition-colors"
          >
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400">Active filters:</span>
          {minPrimaryMatch > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs rounded-full">
              Primary ≥ {minPrimaryMatch}%
              <button onClick={() => removeFilter("primary")} className="hover:text-indigo-900 ml-0.5">
                <X size={10} />
              </button>
            </span>
          )}
          {minSecondaryMatch > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs rounded-full">
              Secondary ≥ {minSecondaryMatch}%
              <button onClick={() => removeFilter("secondary")} className="hover:text-indigo-900 ml-0.5">
                <X size={10} />
              </button>
            </span>
          )}
          {minExperience > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs rounded-full">
              Exp ≥ {minExperience} yr{minExperience !== 1 ? "s" : ""}
              <button onClick={() => removeFilter("experience")} className="hover:text-indigo-900 ml-0.5">
                <X size={10} />
              </button>
            </span>
          )}
          {selectedSources.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs rounded-full">
              Source: {selectedSources.join(", ")}
              <button onClick={() => removeFilter("source")} className="hover:text-indigo-900 ml-0.5">
                <X size={10} />
              </button>
            </span>
          )}
          <button
            onClick={clearAll}
            className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {["Candidate", "Score", "Primary Match", "Secondary Match", "Experience", "Source", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {h === "Score" ? (
                    <span className="flex items-center gap-1">
                      {h} <ChevronUp size={11} className="text-teal-500" />
                    </span>
                  ) : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                  c.score >= 85 ? "border-l-2 border-l-emerald-400" : ""
                }`}
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0f2240]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#0f2240] text-xs font-semibold">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.currentRole}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <ScoreBadge score={c.score} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 max-w-[80px] bg-slate-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${c.primaryMatch >= 85 ? "bg-emerald-500" : c.primaryMatch >= 70 ? "bg-amber-500" : "bg-red-400"}`}
                        style={{ width: `${c.primaryMatch}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{c.primaryMatch}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 max-w-[80px] bg-slate-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${c.secondaryMatch >= 85 ? "bg-emerald-500" : c.secondaryMatch >= 70 ? "bg-amber-500" : "bg-red-400"}`}
                        style={{ width: `${c.secondaryMatch}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{c.secondaryMatch}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm text-slate-600">{c.experience}</td>
                <td className="px-4 py-3.5 text-xs text-slate-500">{c.source}</td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/jobs/${job.id}/applications/${c.id}`)}
                      className="flex items-center gap-1 text-xs text-teal-600 font-medium hover:underline"
                    >
                      <Eye size={11} /> Profile
                    </button>
                    {c.status !== "Shortlisted" && (
                      <button className="text-xs text-emerald-600 hover:underline font-medium">
                        Shortlist
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-14 text-center">
            <p className="text-slate-400 text-sm">No candidates match your current filters.</p>
            {activeFilterCount > 0 && (
              <button onClick={clearAll} className="mt-2 text-xs text-indigo-500 hover:underline font-medium">
                Clear all filters
              </button>
            )}
          </div>
        )}

        {!showAll && (
          <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Showing candidates with ≥70% match score.{" "}
              <button onClick={() => setShowAll(true)} className="text-teal-600 font-medium hover:underline">
                Show all candidates
              </button>
            </p>
          </div>
        )}
      </div>

      {showExport && <ExportModal onClose={() => setShowExport(false)} jobTitle={job.title} candidateCount={filtered.filter(c => c.status === "Shortlisted").length} />}
    </div>
  );
}
