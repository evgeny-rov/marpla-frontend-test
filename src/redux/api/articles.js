import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_API_URL } from "../../const";

import { getQueryParams } from "../../utils";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_API_URL}/mocks/` }),
  endpoints: (builder) => ({
    getSubjName: builder.mutation({
      query: () => ({
        url: "subjName",
        params: getQueryParams(),
      }),
    }),
  }),
});

export const { useGetSubjNameMutation } = articlesApi;
