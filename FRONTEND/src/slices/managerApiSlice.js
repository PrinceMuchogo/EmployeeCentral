import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const managerApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5125/api/manager'
    }),
    tagTypes: ['Manager'],
    endpoints: (builder) =>({
        login: builder.mutation({
            query: (data) => ({
                url: 'authenticate',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {useLoginMutation} = managerApiSlice;