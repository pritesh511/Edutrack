import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  isAppLoader: boolean;
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isAppLoader: false,
  },
  reducers: {
    setAppLoaderTrue: (state: DashboardState) => {
      state.isAppLoader = true;
    },
    setAppLoaderFalse: (state: DashboardState) => {
      state.isAppLoader = false;
    },
  },
});

export const { setAppLoaderTrue, setAppLoaderFalse } = dashboardSlice.actions;

export const getDashboardData = (state: { dashboard: DashboardState }) =>
  state.dashboard;

export default dashboardSlice.reducer;
