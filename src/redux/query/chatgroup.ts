import { BASE_URL } from "@/utils/constant";
import { ChatGroup } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatgroupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["ChatGroup"],
  endpoints: (builder) => ({
    getGroups: builder.query<{ data: { groups: ChatGroup[] } }, string>({
      query: () => `dashboard/chatgroup`,
      providesTags: ["ChatGroup"],
    }),
    getGroupsDetails: builder.query<{ data: { group: ChatGroup } }, string>({
      query: (id: string) => `dashboard/chatgroup/${id}`,
      providesTags: ["ChatGroup"],
    }),
    postGroup: builder.mutation({
      query: (form) => ({
        url: `dashboard/chatgroup`,
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["ChatGroup"],
    }),
    putChatGroup: builder.mutation({
      query: ({ form, id }) => ({
        url: `dashboard/chatgroup/${id}`,
        method: "PUT",
        body: form,
      }),
      invalidatesTags: ["ChatGroup"],
    }),
    deleteGroup: builder.mutation({
      query: (id: string) => ({
        url: `dashboard/chatgroup/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChatGroup"],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  usePostGroupMutation,
  useDeleteGroupMutation,
  usePutChatGroupMutation,
  useGetGroupsDetailsQuery,
  useLazyGetGroupsDetailsQuery,
} = chatgroupApi;
