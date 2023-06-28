import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5125/api/employee'   
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: 'authenticate',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {useLoginMutation} = employeeApiSlice;