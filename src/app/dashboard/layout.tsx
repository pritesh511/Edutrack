"use client";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        activeTab={activeTab}
      />
      <div className="flex-1 overflow-hidden md:ml-64">
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="p-6 overflow-auto h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
