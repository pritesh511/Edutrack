"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardRoutes } from "@/utils/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardData,
  toggleMiniSidebar,
  toggleSidebar,
} from "@/redux/slices/dashboardSlice";
import { getUserData } from "@/redux/slices/userSlice";
import { Button } from "../ui/button";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";

const Sidebar = () => {
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(getUserData);
  const { isSidebarOpen, miniSidebar } = useSelector(getDashboardData);

  return (
    <aside
      className={`flex flex-col fixed inset-y-0 left-0 z-50 ${
        miniSidebar ? "w-24" : "w-64"
      } bg-white shadow-lg transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-all duration-300 ease-in-out`}
    >
      <div className="p-6 flex gap-2 justify-center">
        <img src="/assets/favicon.ico" className="w-8 h-8" />
        {!miniSidebar && (
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            EduTrack
          </h2>
        )}
      </div>
      <nav className="flex-1 mt-6 px-4">
        {dashboardRoutes.map((tab) => {
          const currentPathClass =
            currentPath === tab.path ? "bg-blue-600 text-white" : "";
          const filterTabClass = !tab.access.includes(
            currentUser?.role as string
          )
            ? "hidden"
            : "";
          return (
            <Link
              key={tab.id}
              onClick={() => dispatch(toggleSidebar())}
              href={tab.path}
              className={`flex flex-row items-center gap-3 px-6 py-3 mb-2 rounded-[8px] hover:bg-blue-600 hover:text-white cursor-pointer transition-colors ${currentPathClass} ${filterTabClass}`}
            >
              {<tab.icon />}
              {miniSidebar ? "" : tab.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center justify-end pr-2 py-2">
        <Button size={"icon"} onClick={() => dispatch(toggleMiniSidebar())}>
          {miniSidebar ? <GoSidebarCollapse /> : <GoSidebarExpand />}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
