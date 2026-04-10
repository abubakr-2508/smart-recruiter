import { useState } from "react";
import { useNavigate } from "react-router";
import { X, Plus, Check, AlertCircle, Save, Send } from "lucide-react";

const portalList = [
  { name: "LinkedIn", color: "#0A66C2", connected: true },
  { name: "Indeed", color: "#003A9B", connected: true },
  { name: "Dice", color: "#EB1C26", connected: true },
  { name: "ZipRecruiter", color: "#36B37E", connected: true },
  { name: "TimesJobs", color: "#FF6B00", connected: false },
  { name: "Naukri", color: "#4A90D9", connected: false },
];

function TagInput({
  label,
  tags,
  onChange,
  placeholder,
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder: string;
}) {
  const [inputVal, setInputVal] = useState("");

  function addTag() {
    const val = inputVal.trim();
    if (val && !tags.includes(val)) {
      onChange([...tags, val]);
      setInputVal("");
    }
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag));
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5 p-2.5 border border-slate-200 rounded-lg bg-white min-h-[44px] mb-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0f2240]/10 text-[#0f2240] rounded-md text-xs font-medium"
          >
            {tag}
            <button onClick={() => removeTag(tag)} className="hover:text-red-500">
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder={tags.length === 0 ? placeholder : "Add more..."}
          className="flex-1 min-w-24 text-xs text-slate-700 placeholder:text-slate-400 border-none outline-none bg-transparent"
        />
      </div>
      <button
        type="button"
        onClick={addTag}
        className="text-xs text-teal-600 font-medium flex items-center gap-1 hover:underline"
      >
        <Plus size={11} /> Add skill
      </button>
    </div>
  );
}

export function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    workType: "Hybrid",
    employmentType: "Full-time",
    description: "",
    responsibilities: "",
    requirements: "",
    experience: "",
    education: "",
    certifications: "",
    threshold: 85,
  });
  const [primarySkills, setPrimarySkills] = useState<string[]>([]);
  const [secondarySkills, setSecondarySkills] = useState<string[]>([]);
  const [selectedPortals, setSelectedPortals] = useState<string[]>(["LinkedIn", "Indeed"]);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  function togglePortal(name: string) {
    setSelectedPortals((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  }

  function handleSaveDraft() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      navigate("/jobs");
    }, 900);
  }

  function handlePublish() {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      navigate("/jobs");
    }, 1200);
  }

  const inputClass =
    "w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all";

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Warning banner */}
      {primarySkills.length === 0 && (
        <div className="flex items-center gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
          <AlertCircle size={16} />
          <span>Primary skills are required for AI scoring to work correctly.</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-5">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Job Basics */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Job Basics</h3>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Job Title *
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. Senior Software Engineer"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                    Department
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Engineering"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. New York, NY"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                    Work Type *
                  </label>
                  <select
                    className={inputClass}
                    value={form.workType}
                    onChange={(e) => setForm({ ...form, workType: e.target.value })}
                  >
                    {["On-site", "Hybrid", "Remote"].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                    Employment Type *
                  </label>
                  <select
                    className={inputClass}
                    value={form.employmentType}
                    onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
                  >
                    {["Full-time", "Contract"].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Job Description</h3>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Overview
                </label>
                <textarea
                  rows={4}
                  className={inputClass + " resize-none"}
                  placeholder="Describe the role and what the candidate will be doing..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Key Responsibilities
                </label>
                <textarea
                  rows={4}
                  className={inputClass + " resize-none"}
                  placeholder="• Responsibility 1&#10;• Responsibility 2"
                  value={form.responsibilities}
                  onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Requirements
                </label>
                <textarea
                  rows={4}
                  className={inputClass + " resize-none"}
                  placeholder="• Requirement 1&#10;• Requirement 2"
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Skills & Scoring */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-1">Skills & Scoring Criteria</h3>
            <p className="text-xs text-slate-400 mb-4">Primary skills carry more weight in the AI scoring model.</p>
            <div className="space-y-4">
              <TagInput
                label="Primary Skills *"
                tags={primarySkills}
                onChange={setPrimarySkills}
                placeholder="Type skill and press Enter..."
              />
              <TagInput
                label="Secondary Skills *"
                tags={secondarySkills}
                onChange={setSecondarySkills}
                placeholder="Type skill and press Enter..."
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                    Experience *
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. 5+ years"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                    Education *
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Bachelor's in CS"
                    value={form.education}
                    onChange={(e) => setForm({ ...form, education: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Certifications
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. AWS Certified"
                  value={form.certifications}
                  onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Scoring summary */}
          <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
            <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Shortlist Threshold</h4>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={50}
                max={100}
                value={form.threshold}
                onChange={(e) => setForm({ ...form, threshold: parseInt(e.target.value) })}
                className="flex-1 accent-teal-600"
              />
              <div className="w-16 text-center">
                <span className="text-xl font-bold text-[#0f2240]">{form.threshold}%</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Candidates above {form.threshold}% will be auto-shortlisted for hiring manager review.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2">
                <p className="text-[11px] text-emerald-700 font-medium">≥85%</p>
                <p className="text-[10px] text-emerald-600">Shortlisted</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-2">
                <p className="text-[11px] text-amber-700 font-medium">70–84%</p>
                <p className="text-[10px] text-amber-600">Review</p>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-lg p-2">
                <p className="text-[11px] text-red-600 font-medium">&lt;70%</p>
                <p className="text-[10px] text-red-500">Low Match</p>
              </div>
            </div>
          </div>

          {/* Portal Selector */}
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-1">Post to Job Portals</h3>
            <p className="text-xs text-slate-400 mb-4">Select portals to distribute this job once published.</p>
            <div className="grid grid-cols-2 gap-2.5">
              {portalList.map((p) => {
                const selected = selectedPortals.includes(p.name);
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => p.connected && togglePortal(p.name)}
                    className={`relative flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      !p.connected
                        ? "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                        : selected
                        ? "border-teal-400 bg-teal-50/50 ring-1 ring-teal-400/30"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: p.color }}
                    >
                      {p.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700">{p.name}</p>
                      <p className={`text-[11px] ${p.connected ? "text-emerald-600" : "text-slate-400"}`}>
                        {p.connected ? "Connected" : "Not connected"}
                      </p>
                    </div>
                    {selected && p.connected && (
                      <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {selectedPortals.length > 0 && (
              <p className="text-xs text-slate-500 mt-3">
                Will post to: <span className="text-teal-600 font-medium">{selectedPortals.join(", ")}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-slate-100 p-4">
        <button
          onClick={() => navigate("/jobs")}
          className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <Save size={14} />
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={handlePublish}
            disabled={publishing || primarySkills.length === 0}
            className="flex items-center gap-2 px-5 py-2 bg-[#0f2240] text-white rounded-lg text-sm font-medium hover:bg-[#1a3460] transition-colors disabled:opacity-50"
          >
            <Send size={14} />
            {publishing ? "Publishing..." : `Publish to ${selectedPortals.length} Portal${selectedPortals.length !== 1 ? "s" : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
}
