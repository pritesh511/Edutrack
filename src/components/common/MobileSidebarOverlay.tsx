"use client";
import { getDashboardData, toggleSidebar } from "@/redux/slices/dashboardSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const MobileSidebarOverlay = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector(getDashboardData);
  if (!isSidebarOpen) return;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      onClick={() => dispatch(toggleSidebar())}
    ></div>
  );
};

export default MobileSidebarOverlay;
