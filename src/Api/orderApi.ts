import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderDetail } from "../pages/Index";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7250/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "Order",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: (UserId?) => ({
        url: "Order",
        params: {
          userId: UserId,
        },
      }),
      providesTags: ["Orders"],
    }),
    getAllOrdersForAdmin: builder.query({
      query: () => ({
        url: "Order",
      }),
      providesTags: ["Orders"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `Order/${id}`,
      }),
      providesTags: ["Orders"],
    }),
    updateOrderHeader: builder.mutation({
      query: (OrderDetails) => ({
        url: "order/" + OrderDetails.orderHeaderId,
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: OrderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderHeaderMutation,
  useGetAllOrdersForAdminQuery,
} = orderApi;
