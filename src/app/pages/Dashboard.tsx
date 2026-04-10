import { useNavigate } from "react-router";
import { useState } from "react";
import {
  Briefcase,
  Users,
  Star,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  Activity,
  AlertCircle,
  UserX,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { jobs, candidates } from "../data/mockData";
import { StatusBadge, ScoreBadge } from "../components/ui/Badge";

const applicationTrend = [
  { day: "Mar 15", applications: 12 },
  { day: "Mar 18", applications: 28 },
  { day: "Mar 21", applications: 45 },
  { day: "Mar 24", applications: 38 },
  { day: "Mar 27", applications: 62 },
  { day: "Mar 30", applications: 55 },
  { day: "Apr 2", applications: 78 },
  { day: "Apr 5", applications: 91 },
  { day: "Apr 8", applications: 84 },
];

const sourceData = [
  { source: "LinkedIn", count: 186 },
  { source: "Direct", count: 94 },
  { source: "Manual", count: 67 },
  { source: "Email", count: 43 },
  { source: "Indeed", count: 89 },
  { source: "Historical", count: 34 },
];

const recentActivity = [
  { action: "18 candidates shortlisted", job: "Senior Software Engineer", time: "2h ago", type: "shortlist" },
  { action: "Job published to 3 portals", job: "Data Scientist", time: "4h ago", type: "publish" },
  { action: "34 resumes uploaded", job: "Product Manager", time: "5h ago", type: "upload" },
  { action: "Indeed posting failed", job: "Product Manager", time: "6h ago", type: "error" },
  { action: "Email ingestion completed", job: "12 resumes detected", time: "Yesterday", type: "import" },
  { action: "UX Designer draft created", job: "UX Designer", time: "Yesterday", type: "draft" },
];

const activityColor: Record<string, string> = {
  shortlist: "bg-emerald-100 text-emerald-600",
  publish: "bg-teal-100 text-teal-600",
  upload: "bg-blue-100 text-blue-600",
  error: "bg-red-100 text-red-600",
  import: "bg-purple-100 text-purple-600",
  draft: "bg-amber-100 text-amber-600",
};

const activityIcon: Record<string, React.ReactNode> = {
  shortlist: <Star size={13} />,
  publish: <TrendingUp size={13} />,
  upload: <Users size={13} />,
  error: <AlertCircle size={13} />,
  import: <Activity size={13} />,
  draft: <Clock size={13} />,
};

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs.filter((j) => j.status === "Active")[0]?.id ?? jobs[0].id);

  const activeJobs = jobs.filter((j) => j.status === "Active").length;
  const closedJobs = jobs.filter((j) => j.status === "Closed").length;
  const draftJobs = jobs.filter((j) => j.status === "Draft").length;
  const totalApps = jobs.reduce((a, j) => a + j.applicationCount, 0);
  const above70 = candidates.filter((c) => c.score >= 70).length;
  const shortlisted = candidates.filter((c) => c.status === "Shortlisted").length;
  const pendingReview = 3;

  const stats = [
    { label: "Active Jobs", value: activeJobs, icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", to: "/jobs?status=Active" },
    { label: "Closed Jobs", value: closedJobs, icon: Clock, color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-100", to: "/jobs?status=Closed" },
    { label: "Draft Jobs", value: draftJobs, icon: Activity, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", to: "/jobs?status=Draft" },
    { label: "Total Applications", value: totalApps, icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", to: "/applications" },
    { label: "Candidates ≥70%", value: above70, icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100", to: "/applications" },
    { label: "Shortlisted ≥85%", value: shortlisted, icon: Star, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", to: "/shortlist" },
    { label: "Pending Review", value: pendingReview, icon: AlertCircle, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100", to: "/imports/review-queue" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 text-xl font-semibold">Good morning, Mayda</h1>
          <p className="text-slate-500 text-sm mt-0.5">Here's your hiring overview for today, April 9, 2026.</p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => navigate("/imports")}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors"
          >
            Import Candidates
          </button>
          <button
            onClick={() => navigate("/jobs/create")}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460] transition-colors"
          >
            + Create Job
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-7 gap-3">
        {stats.map((stat) => (
          <button
            key={stat.label}
            onClick={() => navigate(stat.to)}
            className={`bg-white rounded-xl border ${stat.border} p-4 text-left hover:shadow-md transition-all group`}
          >
            <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon size={16} className={stat.color} />
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1 leading-tight">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Application trend */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Application Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Daily applications over the last 3 weeks</p>
            </div>
            <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium bg-emerald-50 px-2.5 py-1 rounded-full">
              <ArrowUpRight size={12} /> +24% this week
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={applicationTrend}>
              <defs>
                <linearGradient id="dashAppGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }}
              />
              <Area key="area-applications" type="monotone" dataKey="applications" stroke="#0d9488" strokeWidth={2} fill="url(#dashAppGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Source breakdown */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">Source Breakdown</h3>
          <p className="text-xs text-slate-400 mb-4">Candidates by import source</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={sourceData} layout="vertical" barSize={10}>
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="source" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={55} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }}
                cursor={false}
              />
              <Bar key="bar-count" dataKey="count" fill="#0f2240" radius={[0, 4, 4, 0]} activeBar={{ fill: "#6366f1", radius: [0, 4, 4, 0] }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Jobs snapshot */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
            <h3 className="text-sm font-semibold text-slate-800">Active Job Openings</h3>
            <button
              onClick={() => navigate("/jobs")}
              className="text-xs text-teal-600 font-medium flex items-center gap-1 hover:underline"
            >
              View all <ChevronRight size={12} />
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-50">
                {["Job Title", "Dept", "Applications", "Shortlisted", "Status"].map((h) => (
                  <th key={h} className="px-5 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.filter((j) => j.status === "Active").map((job) => (
                <tr
                  key={job.id}
                  onMouseEnter={() => setSelectedJobId(job.id)}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`border-b border-slate-50 cursor-pointer transition-colors ${
                    selectedJobId === job.id
                      ? "bg-indigo-50/60"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <td className="py-3 pl-0 pr-5">
                    <div className="flex items-center gap-0">
                      <div
                        className={`w-[3px] self-stretch rounded-r-full mr-4 transition-colors ${
                          selectedJobId === job.id ? "bg-indigo-400" : "bg-transparent"
                        }`}
                      />
                      <div>
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate(`/jobs/${job.id}`); }}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline text-left transition-colors"
                        >
                          {job.title}
                        </button>
                        <p className="text-xs text-slate-400">{job.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">{job.department}</td>
                  <td className="px-5 py-3 text-sm font-medium text-slate-800">{job.applicationCount}</td>
                  <td className="px-5 py-3 text-sm font-medium text-emerald-600">{job.shortlistedCount}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={job.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Top candidates — filtered by selected job */}
          {(() => {
            const selectedJob = jobs.find((j) => j.id === selectedJobId);
            const topCandidates = candidates
              .filter((c) => c.jobId === selectedJobId && c.status === "Shortlisted")
              .sort((a, b) => b.score - a.score)
              .slice(0, 3);

            return (
              <div className="bg-white rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-slate-800">Top Candidates</h3>
                  <button onClick={() => navigate("/shortlist")} className="text-xs text-teal-600 font-medium hover:underline flex items-center gap-1">
                    Shortlist <ChevronRight size={12} />
                  </button>
                </div>
                {selectedJob && (
                  <p className="text-[11px] text-indigo-500 font-medium mb-3 truncate">
                    {selectedJob.title}
                  </p>
                )}
                <div className="min-h-[200px]">
                  {topCandidates.length > 0 ? (
                    <div className="space-y-2">
                      {topCandidates.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => navigate(`/jobs/${c.jobId}/applications/${c.id}`)}
                          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#0f2240]/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-[#0f2240] text-xs font-semibold">
                                {c.name.split(" ").map((n) => n[0]).join("")}
                              </span>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-slate-800">{c.name}</p>
                              <p className="text-[11px] text-slate-400">{c.currentRole}</p>
                            </div>
                          </div>
                          <ScoreBadge score={c.score} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center">
                      <UserX size={22} className="text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-400 font-medium">No shortlisted candidates</p>
                      <p className="text-[11px] text-slate-300 mt-0.5">for this job yet</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Recent Activity</h3>
            <div className="space-y-2.5">
              {recentActivity.slice(0, 4).map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className={`w-6 h-6 rounded-lg ${activityColor[a.type]} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    {activityIcon[a.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 leading-tight">{a.action}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{a.job} · {a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}