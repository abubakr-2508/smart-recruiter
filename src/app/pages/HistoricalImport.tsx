import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Upload, CheckCircle, ChevronRight, FileSpreadsheet, FileArchive, AlertCircle } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

const fieldMapping = [
  { source: "Full Name", target: "name", confidence: 99 },
  { source: "Email Address", target: "email", confidence: 97 },
  { source: "Contact Number", target: "phone", confidence: 89 },
  { source: "Position Applied", target: "jobTitle", confidence: 72 },
  { source: "Skills / Expertise", target: "skills", confidence: 81 },
  { source: "Years Experience", target: "experience", confidence: 94 },
  { source: "Highest Education", target: "education", confidence: 78 },
  { source: "Resume File", target: "resume", confidence: 65 },
];

export function HistoricalImport() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  function handleFileUpload(f: File | null) {
    if (f) {
      setFile(f);
      setStep(2);
    }
  }

  function startImport() {
    setStep(4);
    setImporting(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setImporting(false);
          return 100;
        }
        return p + 4;
      });
    }, 100);
  }

  const steps = [
    { num: 1, label: "Upload File" },
    { num: 2, label: "Map Fields" },
    { num: 3, label: "Review" },
    { num: 4, label: "Import" },
  ];

  return (
    <div className="space-y-5 max-w-3xl">
      <button onClick={() => navigate("/imports")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={14} /> Import Center
      </button>

      {/* Step indicator */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                  step > s.num ? "bg-emerald-500 text-white" :
                  step === s.num ? "bg-[#0f2240] text-white" :
                  "bg-slate-100 text-slate-400"
                }`}>
                  {step > s.num ? <CheckCircle size={14} /> : s.num}
                </div>
                <span className={`text-xs font-medium ${step >= s.num ? "text-slate-700" : "text-slate-400"}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${step > s.num ? "bg-emerald-300" : "bg-slate-100"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 - Upload */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Upload Historical Data</h2>
          <p className="text-sm text-slate-500 mb-5">Import CSV, Excel, or ZIP archives of past candidate records.</p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { icon: FileSpreadsheet, label: "CSV / Excel", desc: "Spreadsheet with candidate data", accept: ".csv,.xlsx,.xls" },
              { icon: FileSpreadsheet, label: "Excel Workbook", desc: "Multi-sheet Excel file", accept: ".xlsx" },
              { icon: FileArchive, label: "ZIP Archive", desc: "Folder of resumes", accept: ".zip" },
            ].map((type) => (
              <label key={type.label} className="cursor-pointer p-4 border border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 transition-all text-center group">
                <type.icon size={24} className="text-slate-400 group-hover:text-teal-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">{type.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{type.desc}</p>
                <input type="file" accept={type.accept} className="hidden" onChange={(e) => handleFileUpload(e.target.files?.[0] || null)} />
              </label>
            ))}
          </div>

          <div
            onDrop={(e) => { e.preventDefault(); handleFileUpload(e.dataTransfer.files[0]); }}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-slate-300 transition-colors"
          >
            <Upload size={22} className="text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Or drag and drop your file here</p>
          </div>
        </div>
      )}

      {/* Step 2 - Field Mapping */}
      {step === 2 && file && (
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Map Fields</h2>
          <p className="text-sm text-slate-500 mb-1">File: <span className="font-medium text-slate-700">{file.name}</span></p>
          <p className="text-xs text-slate-400 mb-5">SmartRecruiter detected these columns. Confirm the mapping before proceeding.</p>

          <div className="space-y-2">
            {fieldMapping.map((mapping) => (
              <div key={mapping.source} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-600">Source: <span className="text-slate-800">{mapping.source}</span></p>
                </div>
                <ChevronRight size={14} className="text-slate-300" />
                <div className="flex-1">
                  <select
                    defaultValue={mapping.target}
                    className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none"
                  >
                    {["name", "email", "phone", "jobTitle", "skills", "experience", "education", "resume", "location", "skip"].map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md ${
                  mapping.confidence >= 90 ? "bg-emerald-50 text-emerald-700" :
                  mapping.confidence >= 70 ? "bg-amber-50 text-amber-700" :
                  "bg-red-50 text-red-600"
                }`}>
                  {mapping.confidence}%
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-5">
            <button onClick={() => setStep(1)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Back</button>
            <button onClick={() => setStep(3)} className="px-4 py-2 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460]">Continue</button>
          </div>
        </div>
      )}

      {/* Step 3 - Review */}
      {step === 3 && (
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-1">Review Import</h2>
          <p className="text-sm text-slate-500 mb-5">Summary of what will be imported. Review before proceeding.</p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Total Records", value: "287", color: "text-slate-800" },
              { label: "Duplicates Detected", value: "14", color: "text-amber-600" },
              { label: "Will Be Imported", value: "273", color: "text-emerald-600" },
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl mb-5 flex items-start gap-2.5">
            <AlertCircle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">14 duplicate records were detected based on matching email addresses. They will be skipped. You can review them in the Review Queue after import.</p>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">Back</button>
            <button onClick={startImport} className="px-4 py-2 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460]">Start Import</button>
          </div>
        </div>
      )}

      {/* Step 4 - Progress */}
      {step === 4 && (
        <div className="bg-white rounded-xl border border-slate-100 p-8 text-center">
          {importing ? (
            <>
              <div className="w-14 h-14 border-4 border-[#0f2240]/10 border-t-[#0f2240] rounded-full animate-spin mx-auto mb-4" />
              <h2 className="text-base font-semibold text-slate-800 mb-1">Importing...</h2>
              <p className="text-sm text-slate-500 mb-5">Processing 287 candidate records</p>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                <div className="bg-teal-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-slate-400">{progress}% complete</p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <h2 className="text-base font-semibold text-slate-800 mb-1">Import Complete!</h2>
              <p className="text-sm text-slate-500 mb-5">273 candidates imported successfully. 14 duplicates skipped.</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => navigate("/imports/review-queue")} className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">View Review Queue</button>
                <button onClick={() => navigate("/applications")} className="px-4 py-2 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460]">View Applications</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}