"use client";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { getDashboardData, toggleSidebar } from "@/redux/slices/dashboardSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector(getDashboardData);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 overflow-hidden md:ml-64">
        <Header />
        <main className="p-6 overflow-auto h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        ></div>
      )}
    </div>
  );
};

export default Layout;
