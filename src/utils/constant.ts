import { config } from "./config";

export const BASE_URL = config.API_URL;

export const BLOG_API_URL = BASE_URL + "dashboard/blog"

export const ADMIN_EMAIL = "gurukul@gmail.com";

export const EDUCAtION_LIST = [
  {
    label: "B.ED",
    value: "bed",
  },
  {
    label: "B.COM",
    value: "bcom",
  },
  {
    label: "M.COM",
    value: "mcom",
  },
  {
    label: "BA",
    value: "BA",
  },
  {
    label: "OTHER",
    value: "other",
  },
];

export const USER_TYPES = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Teacher",
    value: "teacher",
  },
];

export const ATTENDANCE_LIST = [
  {
    label: "Present",
    value: "present",
  },
  {
    label: "Absent",
    value: "absent",
  },
  {
    label: "Late",
    value: "late",
  },
];
