import { configureStore } from "@reduxjs/toolkit";

import campaignSlice from "./slices/Edit/campaign";

import { campaignsApi } from "./api/campaigns";
import { articlesApi } from "./api/articles";

export const store = configureStore({
  reducer: {
    campaign: campaignSlice,
    [campaignsApi.reducerPath]: campaignsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      campaignsApi.middleware,
      articlesApi.middleware
    ),
});
