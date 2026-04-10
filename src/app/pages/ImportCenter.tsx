import { useNavigate } from "react-router";
import {
  Upload,
  Mail,
  Database,
  Users,
  Monitor,
  Share2,
  Cloud,
  Plug,
  ChevronRight,
  Activity,
} from "lucide-react";
import { StatusBadge } from "../components/ui/Badge";

const primarySources = [
  {
    id: "direct-apply",
    title: "Direct Apply",
    description: "Candidate-facing application form. Controlled submission with resume required.",
    icon: Users,
    status: "Active",
    statusVariant: "active" as const,
    cta: "Open Form",
    to: "/imports/direct-apply",
    count: 94,
    color: "bg-teal-500",
  },
  {
    id: "manual-upload",
    title: "Manual Upload",
    description: "Upload resumes from local files, WhatsApp downloads, or email attachments.",
    icon: Upload,
    status: "Active",
    statusVariant: "active" as const,
    cta: "Upload",
    to: "/imports/manual-upload",
    count: 67,
    color: "bg-[#0f2240]",
  },
  {
    id: "historical",
    title: "Bulk Import",
    description: "Import CSV, Excel, or ZIP archives of past candidates from previous ATS or drives.",
    icon: Database,
    status: "Active",
    statusVariant: "active" as const,
    cta: "Import Data",
    to: "/imports/historical",
    count: 287,
    color: "bg-purple-600",
  },
  {
    id: "email",
    title: "Email Ingestion",
    description: "Connect Gmail or Outlook to auto-detect resumes arriving in your inbox.",
    icon: Mail,
    status: "Active",
    statusVariant: "active" as const,
    cta: "Manage Inbox",
    to: "/imports/email",
    count: 43,
    color: "bg-blue-600",
  },
];

const expansionSources = [
  {
    id: "career-widget",
    title: "Career Page Widget",
    description: "Embed a branded apply widget on your company career page to funnel candidates directly.",
    icon: Monitor,
    status: "Connected",
    statusVariant: "connected" as const,
    cta: "Configure",
    color: "bg-indigo-600",
  },
  {
    id: "referral",
    title: "Referral Portal",
    description: "Employee referral link system. Track who referred whom and ingest resumes automatically.",
    icon: Share2,
    status: "Active",
    statusVariant: "active" as const,
    cta: "Open Portal",
    color: "bg-orange-500",
  },
  {
    id: "drive",
    title: "Drive / Dropbox Import",
    description: "Connect Google Drive or Dropbox to sync resume folders directly into SmartRecruiter.",
    icon: Cloud,
    status: "Available",
    statusVariant: "default" as const,
    cta: "Connect",
    color: "bg-sky-500",
  },
  {
    id: "ats",
    title: "ATS Integration",
    description: "Connect Greenhouse, Lever, Workday, or other ATS platforms to sync existing pipelines.",
    icon: Plug,
    status: "Enterprise",
    statusVariant: "shortlisted" as const,
    cta: "Learn More",
    color: "bg-slate-600",
  },
];

export function ImportCenter() {
  const navigate = useNavigate();

  const totalImported = primarySources.reduce((a, s) => a + s.count, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Imported", value: totalImported, icon: Database, color: "text-[#0f2240]", bg: "bg-slate-50 border-slate-100" },
          { label: "Direct Applications", value: 94, icon: Users, color: "text-teal-600", bg: "bg-teal-50 border-teal-100" },
          { label: "Resumes Uploaded", value: 67, icon: Upload, color: "text-purple-600", bg: "bg-purple-50 border-purple-100" },
          { label: "Pending Review", value: 3, icon: Activity, color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-xl border ${s.bg} p-4`}>
            <div className="flex items-center gap-3">
              <s.icon size={18} className={s.color} />
              <div>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Sources */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-sm font-semibold text-slate-800">Primary Import Sources</h2>
          <div className="flex-1 h-px bg-slate-100" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {primarySources.map((source) => (
            <div key={source.id} className="bg-white rounded-xl border border-slate-100 p-5 hover:border-slate-200 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${source.color} rounded-xl flex items-center justify-center`}>
                    <source.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{source.title}</h3>
                    <StatusBadge status={source.status} />
                  </div>
                </div>
                <span className="text-lg font-bold text-slate-700">{source.count}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{source.description}</p>
              <button
                onClick={() => navigate(source.to)}
                className="flex items-center gap-1.5 text-xs font-medium text-teal-600 hover:text-teal-700 group"
              >
                {source.cta}
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Expansion Sources */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-sm font-semibold text-slate-800">Expansion & Strategic Sources</h2>
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-xs text-slate-400">Advanced sourcing channels</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {expansionSources.map((source) => (
            <div key={source.id} className="bg-white rounded-xl border border-slate-100 p-4 hover:border-slate-200 transition-all">
              <div className={`w-9 h-9 ${source.color} rounded-xl flex items-center justify-center mb-3`}>
                <source.icon size={16} className="text-white" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-xs font-semibold text-slate-800">{source.title}</h3>
              </div>
              <StatusBadge status={source.status} />
              <p className="text-[11px] text-slate-500 leading-relaxed my-3">{source.description}</p>
              <button className="text-xs text-teal-600 font-medium hover:underline">{source.cta}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Review queue alert */}
      <button
        onClick={() => navigate("/imports/review-queue")}
        className="w-full flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
            <Activity size={16} className="text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-orange-800">3 items need review</p>
            <p className="text-xs text-orange-600">Low-confidence imports, duplicates, and parsing failures require human review before entering the candidate pool.</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-orange-500" />
      </button>
    </div>
  );
}