import { useState } from "react";
import { useNavigate } from "react-router";
import { RefreshCw, CheckCircle, XCircle, Wifi, Plus, ExternalLink } from "lucide-react";
import { portals } from "../data/mockData";

export function ConnectedPortals() {
  const navigate = useNavigate();
  const [testingPortal, setTestingPortal] = useState<string | null>(null);
  const [testedPortals, setTestedPortals] = useState<string[]>([]);

  function testConnection(name: string) {
    setTestingPortal(name);
    setTimeout(() => {
      setTestingPortal(null);
      setTestedPortals((prev) => [...prev, name]);
    }, 1500);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">Manage your job portal connections for multi-portal distribution.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460] transition-colors">
          <Plus size={14} /> Add Portal
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-emerald-100 p-4">
          <p className="text-2xl font-bold text-emerald-600">{portals.filter(p => p.status === "Connected").length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Connected Portals</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className="text-2xl font-bold text-slate-400">{portals.filter(p => p.status === "Not Connected").length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Not Connected</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4">
          <p className="text-2xl font-bold text-teal-600">6</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Portals Available</p>
        </div>
      </div>

      {/* Portal cards */}
      <div className="grid grid-cols-3 gap-4">
        {portals.map((portal) => {
          const connected = portal.status === "Connected";
          const isTesting = testingPortal === portal.name;
          const wasTested = testedPortals.includes(portal.name);

          return (
            <div
              key={portal.name}
              className={`bg-white rounded-xl border p-5 transition-all ${
                connected ? "border-slate-100 hover:border-slate-200" : "border-slate-100 opacity-80"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: portal.color }}
                  >
                    {portal.logo}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">{portal.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {connected ? (
                        <CheckCircle size={12} className="text-emerald-500" />
                      ) : (
                        <XCircle size={12} className="text-slate-300" />
                      )}
                      <span className={`text-[11px] font-medium ${connected ? "text-emerald-600" : "text-slate-400"}`}>
                        {portal.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              {connected ? (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Account</span>
                    <span className="text-slate-600 font-medium truncate ml-2 max-w-[140px]">{portal.account}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Last sync</span>
                    <span className="text-slate-600">{portal.lastSync}</span>
                  </div>
                </div>
              ) : (
                <div className="py-3 mb-4">
                  <p className="text-xs text-slate-400 text-center">No account connected</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {connected ? (
                  <>
                    <button
                      onClick={() => testConnection(portal.name)}
                      disabled={isTesting}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs hover:bg-slate-50 transition-colors"
                    >
                      {isTesting ? (
                        <Wifi size={12} className="animate-pulse text-teal-500" />
                      ) : wasTested ? (
                        <CheckCircle size={12} className="text-emerald-500" />
                      ) : (
                        <Wifi size={12} />
                      )}
                      {isTesting ? "Testing..." : wasTested ? "Connected ✓" : "Test"}
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs hover:bg-slate-50 transition-colors">
                      <RefreshCw size={12} />
                      Reconnect
                    </button>
                    <button
                      onClick={() => navigate("/jobs")}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs hover:bg-slate-50 transition-colors"
                    >
                      <ExternalLink size={12} />
                    </button>
                  </>
                ) : (
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0f2240] text-white rounded-lg text-xs hover:bg-[#1a3460] transition-colors">
                    <Plus size={12} /> Connect Account
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
        <p className="font-medium mb-1">Multi-portal posting</p>
        <p className="text-xs text-blue-600">
          When you publish a job, it distributes automatically to all selected portals. Manage connections here to ensure uninterrupted posting. Failed postings can be retried from the Job Detail screen.
        </p>
      </div>
    </div>
  );
}
