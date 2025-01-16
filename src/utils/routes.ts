import { FaTachometerAlt, FaRegCalendarCheck } from "react-icons/fa";
import { IoPeople, IoBookSharp } from "react-icons/io5";
import { BsPersonWorkspace, BsFileEarmarkTextFill } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";

export const dashboardRoutes = [
  {
    id: "dashboard",
    icon: FaTachometerAlt,
    label: "Dashboard",
    path: "/dashboard",
    isShow: true,
  },
  {
    id: "students",
    icon: IoPeople,
    label: "Students",
    path: "/dashboard/student",
    isShow: true,
  },
  {
    id: "teachers",
    icon: BsPersonWorkspace,
    label: "Teachers",
    path: "/dashboard/teacher",
    isShow: true,
  },
  {
    id: "standards",
    icon: IoBookSharp,
    label: "Standards",
    path: "/dashboard/standard",
    isShow: true,
  },
  {
    id: "subjects",
    icon: SiBookstack,
    label: "Subjects",
    path: "/dashboard/subject",
    isShow: true,
  },
  {
    id: "attendance",
    icon: SiBookstack,
    label: "Attendance",
    path: "/dashboard/attendance",
    isShow: true,
  },
  {
    id: "reports",
    icon: BsFileEarmarkTextFill,
    label: "Reports",
    path: "/dashboard/report",
    isShow: true,
  },
];
