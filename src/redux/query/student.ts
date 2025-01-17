import { BASE_URL } from "@/utils/constant";
import { Student } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getStudents: builder.query<{ students: Array<Student> }, string>({
      query: () => `dashboard/student`,
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
  usePostStudentMutation,
  useDeleteStudentMutation,
  useEditStudentMutation,
} = studentApi;
