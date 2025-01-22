import { BASE_URL } from "@/utils/constant";
import { Student } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getStudents: builder.query<
      { students: Array<Student> }, Record<string, string | number | undefined>>({
      query: (params: any) => {
        const queryString = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return `dashboard/student${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Student"],
    }),
    postStudent: builder.mutation({
      query: (form) => ({
        url: `dashboard/student`,
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Student"],
    }),
    editStudent: builder.mutation({
      query: ({ id, form }) => ({
        url: `dashboard/student?studentId=${id}`,
        method: "PUT",
        body: form,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `dashboard/student?studentId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useLazyGetStudentsQuery,
  usePostStudentMutation,
  useDeleteStudentMutation,
  useEditStudentMutation,
} = studentApi;
