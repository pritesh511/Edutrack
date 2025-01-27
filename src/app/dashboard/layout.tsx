"use client";
import MobileSidebarOverlay from "@/components/common/MobileSidebarOverlay";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { Suspense } from "react";
import DashboardLoading from "./loading";
import { useSelector } from "react-redux";
import { getDashboardData } from "@/redux/slices/dashboardSlice";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { miniSidebar } = useSelector(getDashboardData);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div
        className={`flex-1 overflow-hidden ${
          miniSidebar ? "md:ml-24" : "md:ml-64"
        }`}
      >
        <Header />
        <Suspense fallback={<DashboardLoading />}>
          <main className="p-6 overflow-auto h-[calc(100vh-90px)]">
            {children}
          </main>
        </Suspense>
      </div>
      <MobileSidebarOverlay />
      <Toaster />
    </div>
  );
};

export default Layout;
