import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ChatbotPanel } from "./ChatbotPanel";
import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";

function LayoutInner() {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#f4f6f9]">
      <Sidebar />
      <TopBar />
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ease-in-out ${
          collapsed ? "ml-[68px]" : "ml-60"
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
      <ChatbotPanel />
    </div>
  );
}

export function Layout() {
  return (
    <SidebarProvider>
      <LayoutInner />
    </SidebarProvider>
  );
}