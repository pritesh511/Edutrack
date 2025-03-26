import { BASE_URL } from "@/utils/constant";
import type { DropdownOption, Standard } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const standardApi = createApi({
  reducerPath: "standardApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Standard"],
  endpoints: (builder) => ({
    getStandard: builder.query<{ data: { standards: Standard[] } }, string>({
      query: () => `dashboard/standard`,
      providesTags: ["Standard"],
    }),
    getStandardDropdown: builder.query<
      { data: { standards: DropdownOption[] } },
      string
    >({
      query: () => `dashboard/standard?dropdown=true`,
    }),
    postStandard: builder.mutation({
      query: (form) => ({
        url: `dashboard/standard`,
        method: "POST",
        body: form,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Standard"],
    }),
    editStandard: builder.mutation({
      query: ({ id, form }) => ({
        url: `dashboard/standard?standardId=${id}`,
        method: "PUT",
        body: form,
      }),
      invalidatesTags: ["Standard"],
    }),
    deleteStandard: builder.mutation({
      query: (id: string) => ({
        url: `dashboard/standard?standardId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Standard"],
    }),
  }),
});

export const {
  useGetStandardQuery,
  useDeleteStandardMutation,
  usePostStandardMutation,
  useEditStandardMutation,
  useGetStandardDropdownQuery,
  useLazyGetStandardDropdownQuery,
} = standardApi;
