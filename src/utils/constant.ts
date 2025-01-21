import { config } from "./config";

export const BASE_URL = config.API_URL;

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
