import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Globe,
  MapPin,
  Briefcase,
  Users,
  Star,
  Clock,
  Edit,
  RefreshCw,
  ExternalLink,
  Plus,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { jobs } from "../data/mockData";
import { StatusBadge } from "../components/ui/Badge";

function PortalStatusIcon({ status }: { status: string }) {
  if (status === "Posted") return <CheckCircle size={14} className="text-emerald-500" />;
  if (status === "Failed") return <AlertCircle size={14} className="text-red-500" />;
  return <Loader size={14} className="text-amber-500 animate-spin" />;
}

export function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === id) || jobs[0];

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button onClick={() => navigate("/jobs")} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700">
          <ArrowLeft size={14} />
          Job Openings
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-medium">{job.title}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-semibold text-slate-800">{job.title}</h1>
              <StatusBadge status={job.status} />
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Briefcase size={13} /> {job.department}</span>
              <span className="flex items-center gap-1.5"><MapPin size={13} /> {job.location}</span>
              <span className="flex items-center gap-1.5"><Globe size={13} /> {job.workType}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} /> {job.employmentType}</span>
            </div>
            {job.postedDate && (
              <p className="text-xs text-slate-400 mt-2">Posted {job.postedDate} · {job.salaryRange}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/jobs/${job.id}/applications`)}
              className="flex items-center gap-2 px-4 py-2 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460] transition-colors"
            >
              <Users size={14} /> View Applications
            </button>
            {job.status !== "Closed" && (
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                <Edit size={14} /> Edit
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-5 pt-5 border-t border-slate-50">
          {[
            { label: "Total Applications", value: job.applicationCount, color: "text-slate-800" },
            { label: "Shortlisted (≥85%)", value: job.shortlistedCount, color: "text-emerald-600" },
            { label: "Threshold", value: `${job.shortlistThreshold}%`, color: "text-teal-600" },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-6 first:pl-0 border-r border-slate-100 last:border-r-0">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left 2 columns */}
        <div className="col-span-2 space-y-4">
          {/* Job Description */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Job Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{job.description}</p>
            <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Key Responsibilities</h4>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-4">{job.responsibilities}</p>
            <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Requirements</h4>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{job.requirements}</p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Skills & Criteria</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Primary Skills</span>
                  <span className="text-[11px] bg-[#0f2240]/10 text-[#0f2240] px-2 py-0.5 rounded-md font-medium">High weight</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {job.primarySkills.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-[#0f2240]/10 text-[#0f2240] rounded-md text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Secondary Skills</span>
                  <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-medium">Normal weight</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {job.secondarySkills.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-50">
                {[
                  { label: "Experience", value: job.experience },
                  { label: "Education", value: job.education },
                  { label: "Certifications", value: job.certifications || "None specified" },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">{item.label}</p>
                    <p className="text-xs text-slate-700 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Portal distribution */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-800">Portal Distribution</h3>
              <button
                onClick={() => navigate("/portals")}
                className="text-xs text-teal-600 font-medium hover:underline flex items-center gap-1"
              >
                <Plus size={11} /> Add more
              </button>
            </div>

            {Object.keys(job.portalStatus).length === 0 ? (
              <div className="py-6 text-center">
                <Globe size={24} className="text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No portals selected</p>
                <p className="text-xs text-slate-300 mt-1">This job is saved as draft</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {Object.entries(job.portalStatus).map(([portal, status]) => (
                  <div key={portal} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2.5">
                      <PortalStatusIcon status={status} />
                      <div>
                        <p className="text-sm font-medium text-slate-700">{portal}</p>
                        <p className={`text-[11px] font-medium ${
                          status === "Posted" ? "text-emerald-600" : status === "Failed" ? "text-red-500" : "text-amber-600"
                        }`}>{status}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {status === "Failed" ? (
                        <button className="flex items-center gap-1 text-xs text-red-600 border border-red-200 bg-red-50 px-2 py-1 rounded-lg hover:bg-red-100 transition-colors">
                          <RefreshCw size={10} /> Retry
                        </button>
                      ) : status === "Posted" ? (
                        <button className="flex items-center gap-1 text-xs text-slate-500 border border-slate-200 px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors">
                          <ExternalLink size={10} /> View
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Score settings */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Scoring Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Shortlist Threshold</span>
                <span className="text-sm font-semibold text-teal-600">{job.shortlistThreshold}%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Primary Skills Weight</span>
                <span className="text-sm font-semibold text-slate-700">60%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-xs text-slate-500">Secondary Skills Weight</span>
                <span className="text-sm font-semibold text-slate-700">25%</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-slate-500">Other Criteria Weight</span>
                <span className="text-sm font-semibold text-slate-700">15%</span>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate(`/jobs/${job.id}/applications`)}
                className="w-full flex items-center gap-2 px-3 py-2.5 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460] transition-colors"
              >
                <Users size={14} /> View Applications ({job.applicationCount})
              </button>
              <button
                onClick={() => navigate("/shortlist")}
                className="w-full flex items-center gap-2 px-3 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors"
              >
                <Star size={14} /> View Shortlist ({job.shortlistedCount})
              </button>
              <button
                onClick={() => navigate("/portals")}
                className="w-full flex items-center gap-2 px-3 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors"
              >
                <Globe size={14} /> Manage Portals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
