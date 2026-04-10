import { useState } from "react";
import { Search, Plus, Edit, Trash2, Shield, Users, Briefcase } from "lucide-react";
import { users } from "../data/mockData";

const roleColor: Record<string, string> = {
  Admin: "bg-purple-50 text-purple-700 border border-purple-200",
  Recruiter: "bg-blue-50 text-blue-700 border border-blue-200",
  "Hiring Manager": "bg-teal-50 text-teal-700 border border-teal-200",
};

export function UserManagement() {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <p className="text-slate-500 text-sm">Manage recruiter, hiring manager, and admin access across SmartRecruiter.</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Users", value: users.length, icon: Users, color: "text-slate-700", bg: "border-slate-100" },
          { label: "Active Users", value: users.filter(u => u.status === "Active").length, icon: Shield, color: "text-emerald-600", bg: "border-emerald-100" },
          { label: "Roles Assigned", value: 3, icon: Briefcase, color: "text-blue-600", bg: "border-blue-100" },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-xl border ${s.bg} p-4 flex items-center gap-3`}>
            <s.icon size={18} className={s.color} />
            <div>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>
        <select className="px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 bg-slate-50 focus:outline-none">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Recruiter</option>
          <option>Hiring Manager</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0f2240] text-white rounded-lg text-sm hover:bg-[#1a3460] transition-colors ml-auto">
          <Plus size={14} /> Invite User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {["User", "Role", "Assigned Jobs", "Status", "Last Active", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${user.status === "Inactive" ? "opacity-60" : ""}`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0f2240]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#0f2240] text-xs font-semibold">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${roleColor[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-600 max-w-[200px] truncate">
                  {user.assignedJobs}
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${
                    user.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-50 text-slate-400 border-slate-200"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-500">{user.lastActive}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-teal-600 transition-colors">
                      <Edit size={12} /> Edit
                    </button>
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors">
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