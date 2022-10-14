import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  campaignName: "",
  budget: 0,
  dailyBudget: false,
  status: false,
  searchElements: [],
  words: [],
  list: [],
  count: {
    total: 0,
    active: 0,
    pause: 0,
    archive: 0,
  },
};

export const campaign = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setList, setCount } = campaign.actions;

export default campaign.reducer;
