import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


//const baseQuery = fetchBaseQuery({ baseUrl: ''});

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5125/api'})


export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) =>({}),
});