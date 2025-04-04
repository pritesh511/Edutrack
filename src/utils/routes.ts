import { FaTachometerAlt } from "react-icons/fa";
import { IoPeople, IoBookSharp } from "react-icons/io5";
import { BsPersonWorkspace, BsFileEarmarkTextFill } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import { IoIosChatboxes } from "react-icons/io";
import { SlCalender } from "react-icons/sl";

export const dashboardRoutes = [
  {
    id: "dashboard",
    icon: FaTachometerAlt,
    label: "Dashboard",
    path: "/dashboard",
    access: ["admin"],
  },
  {
    id: "students",
    icon: IoPeople,
    label: "Students",
    path: "/dashboard/student",
    access: ["admin", "teacher"],
  },
  {
    id: "teachers",
    icon: BsPersonWorkspace,
    label: "Teachers",
    path: "/dashboard/teacher",
    access: ["admin"],
  },
  {
    id: "standards",
    icon: IoBookSharp,
    label: "Standards",
    path: "/dashboard/standard",
    access: ["admin"],
  },
  {
    id: "subjects",
    icon: SiBookstack,
    label: "Subjects",
    path: "/dashboard/subject",
    access: ["admin"],
  },
  {
    id: "chatBox",
    icon: IoIosChatboxes,
    label: "Chat",
    path: "/dashboard/chat",
    access: ["admin", "teacher"],
  },
  {
    id: "calender",
    icon: SlCalender,
    label: "Calender",
    path: "/dashboard/calender",
    access: ["admin", "teacher"],
  },
  {
    id: "attendance",
    icon: SiBookstack,
    label: "Attendance",
    path: "/dashboard/attendance",
    access: ["admin", "teacher"],
  },
  // {
  //   id: "competition",
  //   icon: SiBookstack,
  //   label: "Competition",
  //   path: "/dashboard/competition",
  //   access: ["admin", "teacher"],
  // },
  {
    id: "reports",
    icon: BsFileEarmarkTextFill,
    label: "Reports",
    path: "/dashboard/report",
    access: ["admin", "teacher"],
  },
  {
    id: "blog",
    icon: BsFileEarmarkTextFill,
    label: "Blog",
    path: "/dashboard/blog",
    access: ["admin"],
  },
];
