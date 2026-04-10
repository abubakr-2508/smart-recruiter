import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, CheckCircle, AlertCircle, ToggleLeft, ToggleRight, Eye, Trash2 } from "lucide-react";

const detectedEmails = [
  { id: 1, subject: "RE: Application for Senior Software Engineer – Marcus J.", from: "marcus.j@gmail.com", date: "Apr 9, 09:12", confidence: 94, status: "High" },
  { id: 2, subject: "FWD: My resume – Sarah Chen", from: "sarah.chen@email.com", date: "Apr 9, 08:45", confidence: 87, status: "High" },
  { id: 3, subject: "Job application", from: "unknown.person@hotmail.com", date: "Apr 8, 17:22", confidence: 43, status: "Review" },
  { id: 4, subject: "Re: Open positions at your company", from: "jobseeker2@yahoo.com", date: "Apr 8, 14:10", confidence: 55, status: "Review" },
  { id: 5, subject: "Application for Eng role – David Park", from: "d.park@outlook.com", date: "Apr 7, 11:30", confidence: 91, status: "High" },
];

export function EmailIngestion() {
  const navigate = useNavigate();
  const [autoImport, setAutoImport] = useState(true);
  const [gmailConnected] = useState(true);
  const [outlookConnected] = useState(false);

  return (
    <div className="space-y-5 max-w-4xl">
      <button onClick={() => navigate("/imports")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={14} /> Import Center
      </button>

      <div className="grid grid-cols-2 gap-4">
        {/* Gmail */}
        <div className={`bg-white rounded-xl border p-5 ${gmailConnected ? "border-slate-100" : "border-slate-100"}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Gmail</h3>
                <p className="text-xs text-slate-500">inbox@hiring.smarthire.com</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-emerald-500" />
              <span className="text-xs font-medium text-emerald-600">Connected</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="bg-slate-50 rounded-lg p-2 text-center">
              <p className="font-bold text-slate-700">43</p>
              <p className="text-slate-400">Resumes detected</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 text-center">
              <p className="font-bold text-slate-700">5</p>
              <p className="text-slate-400">Pending review</p>
            </div>
          </div>
          <button className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 transition-colors">
            Manage Connection
          </button>
        </div>

        {/* Outlook */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M19.5 4h-15C3.67 4 3 4.67 3 5.5v13c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-13c0-.83-.67-1.5-1.5-1.5zm-1 2L12 12.5 5.5 6h13zM5 17.5v-10l7 6.5 7-6.5v10H5z" fill="#0078D4"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Outlook / Microsoft 365</h3>
                <p className="text-xs text-slate-400">Not connected</p>
              </div>
            </div>
            <AlertCircle size={14} className="text-slate-300" />
          </div>
          <p className="text-xs text-slate-400 mb-3">Connect your Microsoft Outlook or Exchange account to auto-detect incoming resumes.</p>
          <button className="w-full px-3 py-2 bg-[#0f2240] text-white rounded-lg text-xs hover:bg-[#1a3460] transition-colors">
            Connect Outlook
          </button>
        </div>
      </div>

      {/* Detection rules */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Detection Settings</h3>
            <p className="text-xs text-slate-400 mt-0.5">Configure how SmartRecruiter identifies resume emails</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-slate-700">Auto-import high confidence emails (≥80%)</p>
              <p className="text-xs text-slate-400">Automatically add to candidate pool without manual review</p>
            </div>
            <button onClick={() => setAutoImport(!autoImport)}>
              {autoImport ? (
                <ToggleRight size={22} className="text-teal-500" />
              ) : (
                <ToggleLeft size={22} className="text-slate-300" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-slate-700">Low confidence threshold</p>
              <p className="text-xs text-slate-400">Send to Review Queue if confidence is below this</p>
            </div>
            <select className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none">
              <option>60%</option>
              <option>70%</option>
              <option>80%</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-slate-700">Detection keywords</p>
              <p className="text-xs text-slate-400">Subject line patterns to detect resume emails</p>
            </div>
            <span className="text-xs text-teal-600 font-medium">resume, application, CV, apply, candidacy</span>
          </div>
        </div>
      </div>

      {/* Detected emails */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Detected Resume Emails</h3>
            <p className="text-xs text-slate-400 mt-0.5">3 need review · {autoImport ? "Auto-importing high confidence" : "Manual review enabled"}</p>
          </div>
          <button
            onClick={() => navigate("/imports/review-queue")}
            className="text-xs text-orange-600 font-medium border border-orange-200 bg-orange-50 px-2.5 py-1 rounded-lg hover:bg-orange-100 transition-colors"
          >
            3 Need Review
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-50">
              {["Subject", "Sender", "Date", "Confidence", "Action"].map((h) => (
                <th key={h} className="px-5 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {detectedEmails.map((email) => (
              <tr key={email.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3">
                  <p className="text-xs font-medium text-slate-700 truncate max-w-[220px]">{email.subject}</p>
                </td>
                <td className="px-5 py-3 text-xs text-slate-500">{email.from}</td>
                <td className="px-5 py-3 text-xs text-slate-500">{email.date}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                    email.confidence >= 80 ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                    "bg-orange-50 text-orange-700 border border-orange-200"
                  }`}>
                    {email.confidence}% · {email.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs text-teal-600 hover:underline">
                      <Eye size={11} /> View
                    </button>
                    {email.status === "Review" && (
                      <button onClick={() => navigate("/imports/review-queue")} className="text-xs text-orange-600 hover:underline">
                        Review
                      </button>
                    )}
                    <button className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}