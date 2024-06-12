import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7250/api/auth/",
  }),

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "register",
        method: "POST",
        headers: { "content-type": "application/json" },
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredential) => ({
        url: "login",
        method: "POST",
        headers: { "content-type": "application/json" },
        body: userCredential,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
