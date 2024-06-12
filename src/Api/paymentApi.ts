import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7250/api/",
  }),

  endpoints: (builder) => ({
    initialPayment: builder.mutation({
      query: (userId) => ({
        url: "Payment",
        method: "POST",
        params: {
          userId,
        },
      }),
    }),
  }),
});

export const { useInitialPaymentMutation } = paymentApi;
