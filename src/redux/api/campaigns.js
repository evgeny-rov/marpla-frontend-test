import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_API_URL } from "../../const";

import { getQueryParams } from "../../utils";

export const campaignsApi = createApi({
  reducerPath: "campaignsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_API_URL}/mocks/` }),
  endpoints: (builder) => ({
    getList: builder.query({
      query: () => ({
        url: "list",
        params: getQueryParams(),
      }),
    }),
    getCount: builder.query({
      query: () => ({
        url: "count",
        params: getQueryParams(),
      }),
    }),
  }),
});

export const { useGetCountQuery, useGetListQuery } = campaignsApi;
