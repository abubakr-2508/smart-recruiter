import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, X, CheckCircle, AlertCircle, Loader, ArrowLeft, FileText } from "lucide-react";
import { importHistory } from "../data/mockData";

type FileItem = {
  id: string;
  name: string;
  size: string;
  status: "processing" | "done" | "error";
};

export function ManualUpload() {
  const navigate = useNavigate();
  const [job, setJob] = useState("JOB001");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [dragging, setDragging] = useState(false);

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    const newFiles: FileItem[] = Array.from(incoming).map((f) => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: (f.size / 1024).toFixed(0) + " KB",
      status: "processing",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((f) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((item) =>
            item.id === f.id ? { ...item, status: Math.random() > 0.1 ? "done" : "error" } : item
          )
        );
      }, 1500 + Math.random() * 1000);
    });
  }

  const doneCount = files.filter((f) => f.status === "done").length;
  const processingCount = files.filter((f) => f.status === "processing").length;

  return (
    <div className="space-y-5 max-w-3xl">
      <button onClick={() => navigate("/imports")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={14} /> Import Center
      </button>

      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-800">Manual Upload</h2>
          <p className="text-sm text-slate-500 mt-1">
            Upload PDF or DOCX resumes directly. Supports bulk upload. SmartRecruiter will parse and score each file automatically.
          </p>
        </div>

        {/* Job selector */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
            Assign to Job
          </label>
          <select
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
          >
            <option value="JOB001">Senior Software Engineer (JOB001)</option>
            <option value="JOB002">Product Manager (JOB002)</option>
            <option value="JOB003">Data Scientist (JOB003)</option>
          </select>
        </div>

        {/* Upload zone */}
        <div
          onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
            dragging ? "border-teal-400 bg-teal-50" : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <Upload size={28} className="text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-700 mb-1">Drag & drop resumes here</p>
          <p className="text-xs text-slate-400 mb-4">Supports PDF, DOC, DOCX · Bulk upload supported</p>
          <label className="cursor-pointer px-5 py-2.5 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460] transition-colors inline-block">
            Browse & Select Files
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>
        </div>

        {/* Files list */}
        {files.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700">{files.length} file{files.length !== 1 ? "s" : ""} added</span>
                {processingCount > 0 && (
                  <span className="text-xs text-amber-600 flex items-center gap-1">
                    <Loader size={11} className="animate-spin" /> {processingCount} processing...
                  </span>
                )}
                {doneCount > 0 && (
                  <span className="text-xs text-emerald-600 flex items-center gap-1">
                    <CheckCircle size={11} /> {doneCount} done
                  </span>
                )}
              </div>
              <button
                onClick={() => setFiles([])}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Clear all
              </button>
            </div>
            <div className="space-y-2">
              {files.map((f) => (
                <div key={f.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <FileText size={16} className="text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate">{f.name}</p>
                    <p className="text-[11px] text-slate-400">{f.size}</p>
                  </div>
                  {f.status === "processing" && <Loader size={14} className="text-amber-500 animate-spin flex-shrink-0" />}
                  {f.status === "done" && <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />}
                  {f.status === "error" && <AlertCircle size={14} className="text-red-500 flex-shrink-0" />}
                  <button onClick={() => setFiles((prev) => prev.filter((i) => i.id !== f.id))}>
                    <X size={14} className="text-slate-400 hover:text-slate-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload history */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-50">
          <h3 className="text-sm font-semibold text-slate-800">Upload History</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-50">
              {["File / Source", "Type", "Job", "Count", "Date", "Status"].map((h) => (
                <th key={h} className="px-5 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {importHistory.map((imp) => (
              <tr key={imp.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 text-sm text-slate-700">{imp.filename}</td>
                <td className="px-5 py-3 text-xs text-slate-500">{imp.type}</td>
                <td className="px-5 py-3 text-xs text-slate-500">{imp.jobId}</td>
                <td className="px-5 py-3 text-sm font-medium text-slate-700">{imp.count}</td>
                <td className="px-5 py-3 text-xs text-slate-500">{imp.date}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                    imp.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                    "bg-orange-50 text-orange-700 border border-orange-200"
                  }`}>{imp.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}