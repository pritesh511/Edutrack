import { BASE_URL } from "@/utils/constant";
import { BlogType } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query<{ data: BlogType[] }, string>({
      query: () => `dashboard/blog`,
      providesTags: ["Blog"],
    }),
    postBlog: builder.mutation({
      query: (form) => ({
        url: `dashboard/blog`,
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Blog"],
    }),
    editBlog: builder.mutation({
      query: ({ id, form }) => ({
        url: `dashboard/blog?blogId=${id}`,
        method: "PUT",
        body: form,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `dashboard/blog?blogId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const { useGetBlogsQuery, usePostBlogMutation, useDeleteBlogMutation, useEditBlogMutation } =
  blogApi;
