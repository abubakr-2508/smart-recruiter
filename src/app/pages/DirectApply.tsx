import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, CheckCircle, ArrowLeft, Link } from "lucide-react";

export function DirectApply() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center">
        <div className="bg-white rounded-2xl border border-slate-100 p-10">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h2 className="text-slate-800 text-lg font-semibold mb-2">Application Submitted!</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Thank you for applying. Your resume has been received and will be processed by SmartRecruiter's AI screening system.
            You'll receive an update at <span className="font-medium text-slate-700">{form.email || "your email"}</span>.
          </p>
          <button
            onClick={() => navigate("/imports")}
            className="px-5 py-2 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460] transition-colors"
          >
            Back to Import Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <button onClick={() => navigate("/imports")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={14} /> Import Center
      </button>

      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-slate-800">Direct Apply</h2>
          <p className="text-sm text-slate-500 mt-1">
            Submit your application directly to SmartRecruiter. Resume upload is required.
          </p>
        </div>

        {/* Job context */}
        <div className="flex items-center gap-3 p-3.5 bg-[#0f2240]/5 border border-[#0f2240]/10 rounded-xl mb-5">
          <div className="w-8 h-8 bg-[#0f2240] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">SH</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Senior Software Engineer</p>
            <p className="text-xs text-slate-500">SmartRecruiter · New York, NY · Hybrid</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "First Name", key: "firstName", placeholder: "John" },
              { label: "Last Name", key: "lastName", placeholder: "Doe" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{f.label} *</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Email Address *</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Phone Number</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
              <span className="flex items-center gap-1.5"><Link size={12} /> LinkedIn Profile (optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/your-profile"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
            />
          </div>

          {/* Resume upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
              Resume / CV *
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                file
                  ? "border-teal-400 bg-teal-50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {file ? (
                <div>
                  <CheckCircle size={24} className="text-teal-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-teal-700">{file.name}</p>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-xs text-slate-500 mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <Upload size={24} className="text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-600 font-medium mb-1">Drag & drop your resume here</p>
                  <p className="text-xs text-slate-400 mb-3">or</p>
                  <label className="cursor-pointer px-4 py-2 bg-[#0f2240] text-white rounded-lg text-xs hover:bg-[#1a3460] transition-colors">
                    Browse Files
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  <p className="text-xs text-slate-400 mt-3">PDF, DOC, or DOCX · Max 10MB</p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!file || !form.firstName || !form.email}
            className="w-full py-3 bg-[#0f2240] text-white rounded-xl text-sm font-medium hover:bg-[#1a3460] transition-colors disabled:opacity-50"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}