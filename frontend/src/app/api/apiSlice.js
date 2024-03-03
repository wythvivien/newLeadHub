import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Leads'],
    endpoints: (builder) => ({}), // endpoints are on the features folder
})