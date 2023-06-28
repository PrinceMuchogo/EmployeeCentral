import { apiSlice } from "./apiSlice";

//const ADMIN_URL = 'http://localhost:5125/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: 'admin/authenticate',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {useLoginMutation} = adminApiSlice;
