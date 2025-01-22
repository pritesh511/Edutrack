"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardRoutes } from "@/utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/redux/slices/dashboardSlice";
import { getUserData } from "@/redux/slices/userSlice";

interface Props {
  isSidebarOpen: boolean;
}

const Sidebar = (props: Props) => {
  const { isSidebarOpen } = props;
  const currentPath = usePathname();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(getUserData);
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          EduTrack
        </h2>
      </div>
      <nav className="mt-6 px-4">
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
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
