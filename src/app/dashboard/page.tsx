"use client";
import React, { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import StudentTabView from "@/components/dashboard/StudentTabView";
import DashboardTabView from "@/components/dashboard/DashboardTabView";

const App = () => {
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
          {activeTab === "dashboard" && <DashboardTabView />}

          {activeTab === "students" && <StudentTabView />}
        </main>
      </div>
    </div>
  );
};

export default App;
