import { BASE_URL } from "@/utils/constant";
import { DropdownOption, Teacher } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
  reducerPath: "teacherrApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Teacher"],
  endpoints: (builder) => ({
    getTeachers: builder.query<{ data: { teachers: Teacher[] } }, string>({
      query: () => `dashboard/teacher`,
      providesTags: ["Teacher"],
    }),
    getTeacherDropdown: builder.query<{ data: { teachers: DropdownOption[] } }, string>({
      query: () => `dashboard/teacher?dropdown=true`,
    }),
    deleteTeacher: builder.mutation({
      query: (id: string) => ({
        url: `dashboard/teacher?teacherId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),
    postTeacher: builder.mutation({
      query: (form) => ({
        url: "dashboard/teacher",
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Teacher"],
    }),
    putTeacher: builder.mutation({
      query: ({ form, id }) => ({
        url: `dashboard/teacher?teacherId=${id}`,
        method: "PUT",
        body: form,
      }),
      invalidatesTags: ["Teacher"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  usePostTeacherMutation,
  useDeleteTeacherMutation,
  usePutTeacherMutation,
  useGetTeacherDropdownQuery,
} = teacherApi;
