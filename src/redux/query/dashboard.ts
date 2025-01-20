import { BASE_URL } from "@/utils/constant";
import { Standard, Student, Subject, Teacher } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getDashboardData: builder.query<
      {
        standards: Array<Standard>;
        subjects: Array<Subject>;
        students: Array<Student>;
        teachers: Array<Teacher>;
      },
      string
    >({
      query: () => `/dashboard`,
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
