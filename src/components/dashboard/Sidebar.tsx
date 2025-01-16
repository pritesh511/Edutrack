"use client";
import React from "react";
import { FaTachometerAlt, FaRegCalendarCheck } from "react-icons/fa";
import { IoPeople, IoBookSharp } from "react-icons/io5";
import { BsPersonWorkspace, BsFileEarmarkTextFill } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  setActiveTab: (value: string) => void;
  isSidebarOpen: boolean;
  activeTab: string;
}

const tabs = [
  {
    id: "dashboard",
    icon: <FaTachometerAlt />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: "students",
    icon: <IoPeople />,
    label: "Students",
    path: "/dashboard/student",
  },
  {
    id: "teachers",
    icon: <BsPersonWorkspace />,
    label: "Teachers",
    path: "/dashboard/teacher",
  },
  {
    id: "standards",
    icon: <IoBookSharp />,
    label: "Standards",
    path: "/dashboard/standard",
  },
  {
    id: "subjects",
    icon: <SiBookstack />,
    label: "Subjects",
    path: "/dashboard/subject",
  },
  {
    id: "attendance",
    icon: <FaRegCalendarCheck />,
    label: "Attendance",
    path: "/dashboard/attendance",
  },
  {
    id: "reports",
    icon: <BsFileEarmarkTextFill />,
    label: "Reports",
    path: "/dashboard/report",
  },
];

const Sidebar = (props: Props) => {
  const { isSidebarOpen } = props;
  const currentPath = usePathname();
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
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.path}
            className={`flex flex-row items-center gap-3 px-6 py-3 mb-2 rounded-[8px] hover:bg-blue-600 hover:text-white cursor-pointer transition-colors ${
              currentPath === tab.path ? "bg-blue-600 text-white" : ""
            }`}
          >
            {tab.icon}
            {tab.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
