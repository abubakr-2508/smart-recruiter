import { useState } from "react";
import { useNavigate } from "react-router";
import { Save, RefreshCw, CheckCircle } from "lucide-react";

type Tab = "General" | "Integrations" | "Scoring" | "Notifications" | "Branding";

export function Settings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("General");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const tabs: Tab[] = ["General", "Integrations", "Scoring", "Notifications", "Branding"];

  const inputClass = "w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all";

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-100 p-1.5 flex gap-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? "bg-[#0f2240] text-white" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* General */}
      {tab === "General" && (
        <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-5">
          <h3 className="text-sm font-semibold text-slate-800">General Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Company Name", value: "Acme Corporation", placeholder: "Your company" },
              { label: "Default Location", value: "New York, NY", placeholder: "Location" },
              { label: "Default Work Type", value: "Hybrid", type: "select", options: ["On-site", "Hybrid", "Remote"] },
              { label: "Default Employment Type", value: "Full-time", type: "select", options: ["Full-time", "Part-time", "Contract"] },
              { label: "Time Zone", value: "America/New_York (EST)", type: "select", options: ["America/New_York (EST)", "America/Chicago (CST)", "America/Los_Angeles (PST)"] },
              { label: "Date Format", value: "MM/DD/YYYY", type: "select", options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"] },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{field.label}</label>
                {field.type === "select" ? (
                  <select className={inputClass} defaultValue={field.value}>
                    {field.options?.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type="text" className={inputClass} defaultValue={field.value} placeholder={field.placeholder} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integrations */}
      {tab === "Integrations" && (
        <div className="space-y-4">
          {/* Email */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Email Configuration</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "SMTP Server", value: "smtp.gmail.com" },
                { label: "SMTP Port", value: "587" },
                { label: "Email From", value: "hiring@company.com" },
                { label: "Reply-To", value: "noreply@smarthire.io" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{f.label}</label>
                  <input type="text" className={inputClass} defaultValue={f.value} />
                </div>
              ))}
            </div>
          </div>

          {/* Portal connections */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-800">Job Portal Connections</h3>
              <button onClick={() => navigate("/portals")} className="text-xs text-teal-600 font-medium hover:underline">
                Manage in Portals →
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: "LinkedIn", status: "Connected", color: "#0A66C2" },
                { name: "Indeed", status: "Connected", color: "#003A9B" },
                { name: "Dice", status: "Connected", color: "#EB1C26" },
                { name: "ZipRecruiter", status: "Connected", color: "#36B37E" },
                { name: "TimesJobs", status: "Not Connected", color: "#FF6B00" },
                { name: "Naukri", status: "Not Connected", color: "#4A90D9" },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-lg">
                  <div className="w-6 h-6 rounded text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0" style={{ background: p.color }}>
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-700">{p.name}</p>
                    <p className={`text-[11px] ${p.status === "Connected" ? "text-emerald-600" : "text-slate-400"}`}>{p.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ATS */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">ATS & Storage Integrations</h3>
            <div className="space-y-2">
              {[
                { name: "Greenhouse ATS", status: "Not connected" },
                { name: "Lever ATS", status: "Not connected" },
                { name: "Google Drive", status: "Not connected" },
                { name: "Dropbox", status: "Not connected" },
              ].map((int) => (
                <div key={int.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-700">{int.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{int.status}</span>
                    <button className="text-xs text-teal-600 font-medium border border-teal-200 bg-teal-50 px-2.5 py-1 rounded-lg hover:bg-teal-100 transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scoring */}
      {tab === "Scoring" && (
        <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-5">
          <h3 className="text-sm font-semibold text-slate-800">Scoring Configuration</h3>
          <p className="text-xs text-slate-400">Configure how SmartRecruiter weights and scores candidates globally.</p>
          <div className="space-y-4">
            {[
              { label: "Primary Skills Weight", value: 60, color: "bg-[#0f2240]" },
              { label: "Secondary Skills Weight", value: 25, color: "bg-teal-500" },
              { label: "Experience Weight", value: 10, color: "bg-blue-500" },
              { label: "Education Weight", value: 5, color: "bg-slate-400" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-700">{s.label}</span>
                  <span className="text-sm font-bold text-slate-800">{s.value}%</span>
                </div>
                <input type="range" min={0} max={100} defaultValue={s.value} className="w-full accent-teal-600" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Default Shortlist Threshold</label>
              <input type="number" min={50} max={100} defaultValue={85} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Default Display Threshold</label>
              <input type="number" min={0} max={100} defaultValue={70} className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {tab === "Notifications" && (
        <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-800">Notification Preferences</h3>
          <div className="space-y-2">
            {[
              { label: "New application received", enabled: true },
              { label: "Candidate shortlisted", enabled: true },
              { label: "Portal posting failed", enabled: true },
              { label: "Review queue items", enabled: true },
              { label: "Email ingestion completed", enabled: false },
              { label: "Weekly summary report", enabled: true },
              { label: "New user invited", enabled: false },
              { label: "Job published", enabled: true },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-700">{n.label}</span>
                <div className="flex items-center gap-3">
                  {["Email", "In-app"].map((ch) => (
                    <label key={ch} className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                      <input type="checkbox" defaultChecked={n.enabled} className="accent-teal-600" />
                      {ch}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Branding */}
      {tab === "Branding" && (
        <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-5">
          <h3 className="text-sm font-semibold text-slate-800">Branding & Appearance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Company Logo</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-slate-300 transition-colors cursor-pointer">
                <p className="text-xs text-slate-400">Drop logo or click to upload</p>
                <p className="text-[11px] text-slate-300 mt-1">PNG, SVG · Max 2MB</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Company Name (on forms)", value: "Acme Corporation" },
                { label: "Careers Page URL", value: "careers.acmecorp.com" },
                { label: "Support Email (candidates)", value: "careers@acmecorp.com" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{f.label}</label>
                  <input type="text" className={inputClass} defaultValue={f.value} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0f2240] text-white rounded-xl text-sm font-medium hover:bg-[#1a3460] transition-colors"
        >
          {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
        </button>
      </div>
    </div>
  );
}