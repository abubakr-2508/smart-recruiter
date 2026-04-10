import { useLocation, useNavigate } from "react-router";
import { Search, Bell, ChevronDown, Plus, HelpCircle, SlidersHorizontal, X, Briefcase } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSidebar } from "../contexts/SidebarContext";
import { candidates, jobs } from "../data/mockData";
import { ScoreBadge } from "./ui/Badge";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/jobs": "Job Openings",
  "/jobs/create": "Create Job",
  "/applications": "Applications",
  "/shortlist": "Shortlist",
  "/portals": "Connected Portals",
  "/imports": "Import Center",
  "/imports/direct-apply": "Direct Apply",
  "/imports/manual-upload": "Manual Upload",
  "/imports/historical": "Bulk Import",
  "/imports/email": "Email Ingestion",
  "/imports/review-queue": "Review Queue",
  "/shortlist/compare": "Candidate Comparison",
  "/audit-log": "Audit Log",
  "/users": "User Management",
  "/settings": "Settings",
};

function getTitle(pathname: string) {
  if (routeTitles[pathname]) return routeTitles[pathname];
  if (pathname.startsWith("/jobs/") && pathname.endsWith("/applications"))
    return "Applications";
  if (pathname.startsWith("/jobs/") && pathname.includes("/applications/"))
    return "Candidate Profile";
  if (pathname.startsWith("/jobs/") && pathname.split("/").length === 3)
    return "Job Detail";
  return "SmartRecruiter";
}

function parseExp(exp: string) {
  const n = parseInt(exp);
  return isNaN(n) ? 0 : n;
}

const EXP_OPTIONS = [
  { label: "Any", value: 0 },
  { label: "2+ yrs", value: 2 },
  { label: "3+ yrs", value: 3 },
  { label: "5+ yrs", value: 5 },
  { label: "7+ yrs", value: 7 },
];

const statusColors: Record<string, string> = {
  Shortlisted: "bg-emerald-100 text-emerald-700",
  "Under Review": "bg-amber-100 text-amber-700",
  Rejected: "bg-red-100 text-red-600",
  New: "bg-blue-100 text-blue-600",
};

export function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { collapsed } = useSidebar();

  // Search state
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrimaryMatch, setMinPrimaryMatch] = useState(0);
  const [minSecondaryMatch, setMinSecondaryMatch] = useState(0);
  const [minExperience, setMinExperience] = useState(0);
  const [tempPrimary, setTempPrimary] = useState(0);
  const [tempSecondary, setTempSecondary] = useState(0);
  const [tempExp, setTempExp] = useState(0);
  const filterRef = useRef<HTMLDivElement>(null);

  // Notifications
  const [notifOpen, setNotifOpen] = useState(false);

  const title = getTitle(location.pathname);

  const activeFilterCount = [
    minPrimaryMatch > 0,
    minSecondaryMatch > 0,
    minExperience > 0,
  ].filter(Boolean).length;

  // Sync temp state when filter opens
  useEffect(() => {
    if (filterOpen) {
      setTempPrimary(minPrimaryMatch);
      setTempSecondary(minSecondaryMatch);
      setTempExp(minExperience);
    }
  }, [filterOpen]);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close filter dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [filterOpen]);

  // Live search results
  const matchedCandidates = search.trim().length >= 1
    ? candidates.filter((c) => {
        const matchText =
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.currentRole.toLowerCase().includes(search.toLowerCase());
        const meetsPrimary = c.primaryMatch >= minPrimaryMatch;
        const meetsSecondary = c.secondaryMatch >= minSecondaryMatch;
        const meetsExp = parseExp(c.experience) >= minExperience;
        return matchText && meetsPrimary && meetsSecondary && meetsExp;
      }).slice(0, 5)
    : [];

  const matchedJobs = search.trim().length >= 1
    ? jobs.filter((j) =>
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.department.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 3)
    : [];

  const hasResults = matchedCandidates.length > 0 || matchedJobs.length > 0;

  function applyFilters() {
    setMinPrimaryMatch(tempPrimary);
    setMinSecondaryMatch(tempSecondary);
    setMinExperience(tempExp);
    setFilterOpen(false);
  }

  function clearFilters() {
    setTempPrimary(0);
    setTempSecondary(0);
    setTempExp(0);
    setMinPrimaryMatch(0);
    setMinSecondaryMatch(0);
    setMinExperience(0);
    setFilterOpen(false);
  }

  function handleCandidateClick(c: typeof candidates[number]) {
    setShowResults(false);
    setSearch("");
    navigate(`/jobs/${c.jobId}/applications/${c.id}`);
  }

  function handleJobClick(j: typeof jobs[number]) {
    setShowResults(false);
    setSearch("");
    navigate(`/jobs/${j.id}`);
  }

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-white border-b border-slate-100 z-20 flex items-center px-6 gap-4 transition-all duration-300 ease-in-out ${
        collapsed ? "left-[68px]" : "left-60"
      }`}
    >
      {/* Page title */}
      <h1 className="text-slate-800 text-base font-semibold min-w-0 truncate flex-shrink-0">
        {title}
      </h1>

      {/* Search + Filter */}
      <div className="flex-1 max-w-lg ml-4 flex items-center gap-2">
        {/* Search with live dropdown */}
        <div className="relative flex-1" ref={searchRef}>
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Search jobs, candidates..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
          />
          {search && (
            <button
              onClick={() => { setSearch(""); setShowResults(false); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={13} />
            </button>
          )}

          {/* Live results dropdown */}
          {showResults && search.trim().length >= 1 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl border border-slate-200 shadow-2xl z-50 overflow-hidden">
              {hasResults ? (
                <div className="max-h-[420px] overflow-y-auto">
                  {/* Candidates section */}
                  {matchedCandidates.length > 0 && (
                    <div>
                      <div className="px-3 pt-3 pb-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Candidates</span>
                      </div>
                      {matchedCandidates.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleCandidateClick(c)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#0f2240]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#0f2240] text-xs font-semibold">
                              {c.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">{c.name}</p>
                            <p className="text-xs text-slate-400 truncate">{c.currentRole}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusColors[c.status] || "bg-slate-100 text-slate-500"}`}>
                              {c.status}
                            </span>
                            <ScoreBadge score={c.score} />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Divider */}
                  {matchedCandidates.length > 0 && matchedJobs.length > 0 && (
                    <div className="mx-3 border-t border-slate-100" />
                  )}

                  {/* Jobs section */}
                  {matchedJobs.length > 0 && (
                    <div>
                      <div className="px-3 pt-3 pb-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Job Openings</span>
                      </div>
                      {matchedJobs.map((j) => (
                        <button
                          key={j.id}
                          onClick={() => handleJobClick(j)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                            <Briefcase size={14} className="text-indigo-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">{j.title}</p>
                            <p className="text-xs text-slate-400">{j.department} · {j.location}</p>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="text-xs text-slate-500">{j.applicationCount} apps</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                              j.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                              j.status === "Draft" ? "bg-amber-100 text-amber-700" :
                              "bg-slate-100 text-slate-500"
                            }`}>{j.status}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <Search size={24} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500 font-medium">No results for "{search}"</p>
                  <p className="text-xs text-slate-400 mt-0.5">Try a different name, role or job title</p>
                </div>
              )}

              {/* Footer hint */}
              <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {hasResults
                    ? `${matchedCandidates.length} candidate${matchedCandidates.length !== 1 ? "s" : ""} · ${matchedJobs.length} job${matchedJobs.length !== 1 ? "s" : ""} found`
                    : "No matches"}
                </span>
                {activeFilterCount > 0 && (
                  <span className="text-[11px] text-indigo-500 font-medium">{activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Filter button */}
        <div className="relative flex-shrink-0" ref={filterRef}>
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors ${
              activeFilterCount > 0
                ? "border-indigo-300 bg-indigo-50 text-indigo-600"
                : "border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            }`}
          >
            <SlidersHorizontal size={14} />
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Filter dropdown */}
          {filterOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-2xl z-50 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-800">Search Filters</span>
                <button onClick={() => setFilterOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
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
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={clearFilters}
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
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Quick create */}
        <button
          onClick={() => navigate("/jobs/create")}
          className="flex items-center gap-1.5 px-3 py-1.5 text-white rounded-lg text-sm transition-all hover:opacity-90 hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] active:shadow-sm"
          style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)" }}
        >
          <Plus size={14} />
          <span>New Job</span>
        </button>

        {/* Help */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
          <HelpCircle size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-11 w-80 bg-white rounded-xl border border-slate-100 shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-800">Notifications</span>
              </div>
              {[
                { text: "18 candidates shortlisted for Senior Software Engineer", time: "2h ago", dot: "bg-teal-500" },
                { text: "Email ingestion completed – 12 resumes detected", time: "4h ago", dot: "bg-amber-500" },
                { text: "Indeed posting failed for Product Manager", time: "Yesterday", dot: "bg-red-500" },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50">
                  <div className={`w-2 h-2 ${n.dot} rounded-full mt-1.5 flex-shrink-0`} />
                  <div>
                    <p className="text-sm text-slate-700">{n.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-indigo-50 border border-indigo-100">
            <span className="text-[11px] font-semibold text-indigo-500">M</span>
          </div>
          <span className="text-sm text-slate-700 font-medium">Mayda</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
}