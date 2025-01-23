import MobileSidebarOverlay from "@/components/common/MobileSidebarOverlay";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-hidden md:ml-64">
        <Header />
        <main className="p-6 overflow-auto h-[calc(100vh-90px)]">
          {children}
        </main>
      </div>
      <MobileSidebarOverlay />
    </div>
  );
};

export default Layout;
