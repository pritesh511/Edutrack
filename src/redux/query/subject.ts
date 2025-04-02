import { BASE_URL } from "@/utils/constant";
import { DropdownOption, Subject } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subjectApi = createApi({
  reducerPath: "subjectApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Subject"],
  endpoints: (builder) => ({
    getSubjects: builder.query<{ subjects: Subject[] }, string>({
      query: () => `dashboard/subject`,
      providesTags: ["Subject"],
    }),
    getSubjectDropdown: builder.query<{ subjects: DropdownOption[] }, string>({
        query: () => `dashboard/subject?dropdown=true`
    }),
    postSubject: builder.mutation({
      query: (form) => ({
        url: `dashboard/subject`,
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Subject"],
    }),
    editSubject: builder.mutation({
      query: ({ form, id }) => ({
        url: `dashboard/subject/${id}`,
        method: "PUT",
        body: form,
      }),
      invalidatesTags: ["Subject"],
    }),
    deleteSubject: builder.mutation({
      query: (id: string) => ({
        url: `dashboard/subject/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subject"],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useDeleteSubjectMutation,
  usePostSubjectMutation,
  useEditSubjectMutation,
  useGetSubjectDropdownQuery
} = subjectApi;
