import { NavLink, useLocation } from "react-router";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Download,
  Globe,
  Inbox,
  ClipboardList,
  Star,
  Settings,
  Shield,
  ChevronRight,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { useSidebar } from "../contexts/SidebarContext";

const navItems = [
  {
    section: "MAIN",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
      { label: "Job Openings", icon: Briefcase, to: "/jobs" },
      { label: "Applications", icon: Users, to: "/applications" },
      { label: "Shortlist", icon: Star, to: "/shortlist" },
    ],
  },
  {
    section: "SOURCING",
    items: [
      { label: "Import Center", icon: Inbox, to: "/imports" },
      { label: "Connected Portals", icon: Globe, to: "/portals" },
      { label: "Review Queue", icon: ClipboardList, to: "/imports/review-queue" },
    ],
  },
  {
    section: "ADMIN",
    items: [
      { label: "User Management", icon: Shield, to: "/users" },
      { label: "Audit Log", icon: Download, to: "/audit-log" },
      { label: "Settings", icon: Settings, to: "/settings" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 flex flex-col z-30 transition-all duration-300 ease-in-out bg-white ${
        collapsed ? "w-[68px]" : "w-60"
      }`}
      style={{ borderRight: "1px solid #e8edf2" }}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center flex-shrink-0 overflow-hidden"
        style={{ borderBottom: "1px solid #e8edf2" }}
      >
        <div
          className={`flex items-center gap-2.5 transition-all duration-300 ${
            collapsed ? "px-[18px]" : "px-5"
          }`}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)" }}
          >
            <Zap size={15} className="text-white" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="text-sm font-semibold tracking-tight whitespace-nowrap text-slate-800">
                SmartRecruiter
              </span>
              <span className="block text-[10px] -mt-0.5 tracking-widest uppercase whitespace-nowrap text-slate-400">
                Enterprise
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 overflow-x-hidden">
        {navItems.map((section) => (
          <div key={section.section} className="mb-4">
            {/* Section label */}
            <div
              className={`mb-1 transition-all duration-300 overflow-hidden ${
                collapsed ? "px-0 h-0 mb-0 opacity-0" : "px-5 h-auto opacity-100"
              }`}
            >
              <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                {section.section}
              </span>
            </div>

            {section.items.map((item) => {
              const isActive =
                item.to === "/dashboard"
                  ? location.pathname === "/dashboard"
                  : location.pathname.startsWith(item.to);

              return (
                <div key={item.to} className="relative group/navitem px-2.5">
                  <NavLink
                    to={item.to}
                    className={`relative flex items-center gap-3 py-[7px] rounded-lg mb-0.5 transition-all duration-150 text-sm overflow-hidden ${
                      collapsed ? "px-[10px] justify-center" : "px-3"
                    } ${
                      isActive
                        ? "bg-indigo-50 text-slate-800"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    }`}
                  >
                    {/* Left accent bar for active */}
                    {isActive && !collapsed && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                        style={{ background: "linear-gradient(180deg, #818cf8 0%, #6366f1 100%)" }}
                      />
                    )}

                    <item.icon
                      size={15}
                      className={`flex-shrink-0 transition-colors ${
                        isActive ? "text-indigo-500" : "text-slate-400"
                      }`}
                    />

                    {!collapsed && (
                      <>
                        <span
                          className="whitespace-nowrap text-[13px]"
                          style={{ fontWeight: isActive ? 500 : 400 }}
                        >
                          {item.label}
                        </span>
                        {isActive && (
                          <ChevronRight size={12} className="ml-auto flex-shrink-0 text-indigo-400" />
                        )}
                      </>
                    )}
                  </NavLink>

                  {/* Tooltip when collapsed */}
                  {collapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover/navitem:opacity-100 transition-opacity duration-150 z-50 shadow-lg">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Toggle row — inside sidebar, above user section */}
      <div style={{ borderTop: "1px solid #e8edf2" }}>
        <button
          onClick={toggleSidebar}
          className={`w-full flex items-center py-3 transition-all duration-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 ${
            collapsed ? "px-[18px] justify-center" : "px-4 gap-2.5"
          }`}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={15} strokeWidth={2} className="flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft size={15} strokeWidth={2} className="flex-shrink-0" />
              <span className="text-[13px] whitespace-nowrap">Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom user */}
      <div className="flex-shrink-0 overflow-hidden" style={{ borderTop: "1px solid #e8edf2" }}>
        <div
          className={`flex items-center py-3.5 transition-all duration-300 ${
            collapsed ? "px-[18px] justify-center" : "px-4 gap-2.5"
          }`}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-indigo-50 border border-indigo-100">
            <span className="text-xs font-semibold text-indigo-500">M</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate text-slate-700">Mayda</p>
              <p className="text-[11px] truncate text-slate-400">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}