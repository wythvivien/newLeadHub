import { apiSlice } from "./apiSlice";

const LEADS_URL = "/api/leads";

export const leadsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeads: builder.query({
      query: () => ({
        url: `${LEADS_URL}`,
        method: "GET",
      }),
      provideTags: ["Lead"],
    }),

    createLead: builder.mutation({
      query: (data) => ({
        url: `${LEADS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lead"],
    }),

    getLead: builder.query({
      query: (id) => ({
        url: `${LEADS_URL}/${id}`,
        method: "GET",
      }),
      provideTags: ["Lead"],
    }),

    updateLead: builder.mutation({
      query: (id, data) => ({
        url: `${LEADS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Lead"],
    }),

    deleteLead: builder.mutation({
      query: (id) => ({
        url: `${LEADS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lead"],
    }),
  }),
});

export const {
  useGetAllLeadsQuery,
  useCreateLeadMutation,
  useGetLeadQuery,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = leadsApiSlice;
