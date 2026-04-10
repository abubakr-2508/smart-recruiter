import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Plus, Filter, ChevronRight, Globe } from "lucide-react";
import { jobs } from "../data/mockData";
import { StatusBadge } from "../components/ui/Badge";

export function JobOpenings() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");

  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];
  const statuses = ["All", "Active", "Draft", "Closed"];

  const filtered = jobs.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || j.status === statusFilter;
    const matchDept = deptFilter === "All" || j.department === deptFilter;
    return matchSearch && matchStatus && matchDept;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">
            {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={() => navigate("/jobs/create")}
          className="flex items-center gap-2 px-4 py-2 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460] transition-colors"
        >
          <Plus size={14} />
          Create Job
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Filter:</span>
        </div>

        <div className="flex gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-[#0f2240] text-white"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-600 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {["Job Title / Location", "Department", "Status", "Posted", "Applications", "Shortlisted", "Portals", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => (
              <tr
                key={job.id}
                className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                  job.status === "Draft" ? "opacity-70" : ""
                }`}
              >
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="text-left group"
                  >
                    <p className="text-sm font-medium text-slate-800 group-hover:text-teal-700 transition-colors">
                      {job.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {job.location} · {job.workType}
                    </p>
                  </button>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-sm text-slate-600">{job.department}</span>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={job.status} />
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-500">
                  {job.postedDate || <span className="text-slate-300 italic">Not published</span>}
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-sm font-semibold text-slate-800">{job.applicationCount}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-sm font-semibold text-emerald-600">{job.shortlistedCount}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    {job.portals.length > 0 ? (
                      <>
                        <Globe size={12} className="text-slate-400" />
                        <span className="text-xs text-slate-500">{job.portals.length} portal{job.portals.length !== 1 ? "s" : ""}</span>
                      </>
                    ) : (
                      <span className="text-xs text-slate-300 italic">None</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="text-xs text-teal-600 font-medium hover:underline"
                    >
                      View
                    </button>
                    <span className="text-slate-200">·</span>
                    {job.status !== "Closed" && (
                      <button
                        onClick={() => navigate(`/jobs/${job.id}/applications`)}
                        className="text-xs text-slate-500 font-medium hover:underline"
                      >
                        Applications
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-slate-400 text-sm">No jobs match your filters.</p>
            <button
              onClick={() => { setSearch(""); setStatusFilter("All"); setDeptFilter("All"); }}
              className="mt-2 text-xs text-teal-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
