import { BASE_URL } from "@/utils/constant";
import { CalenderEvent } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const calenderApi = createApi({
  reducerPath: "calenderApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Calender"],
  endpoints: (builder) => ({
    getEvents: builder.query<{ data: { events: CalenderEvent[] } }, string>({
      query: () => `dashboard/calender`,
      providesTags: ["Calender"],
    }),
    postEvent: builder.mutation({
      query: (form) => ({
        url: `dashboard/calender`,
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["Calender"],
    }),
    deleteEvent: builder.mutation({
      query: (id: string) => ({
        url: `dashboard/calender?eventId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Calender"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  usePostEventMutation,
  useDeleteEventMutation,
} = calenderApi;
