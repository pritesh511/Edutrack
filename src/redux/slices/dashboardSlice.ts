import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  isAppLoader: boolean;
  isSidebarOpen: boolean;
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isAppLoader: false,
    isSidebarOpen: false,
  },
  reducers: {
    setAppLoaderTrue: (state: DashboardState) => {
      state.isAppLoader = true;
    },
    setAppLoaderFalse: (state: DashboardState) => {
      state.isAppLoader = false;
    },
    toggleSidebar: (state: DashboardState) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { setAppLoaderTrue, setAppLoaderFalse, toggleSidebar } = dashboardSlice.actions;

export const getDashboardData = (state: { dashboard: DashboardState }) =>
  state.dashboard;

export default dashboardSlice.reducer;
