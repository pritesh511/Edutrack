import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  isAppLoader: boolean;
  isSidebarOpen: boolean;
  miniSidebar: boolean;
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isAppLoader: false,
    isSidebarOpen: false,
    miniSidebar: false,
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
    toggleMiniSidebar: (state: DashboardState) => {
      state.miniSidebar = !state.miniSidebar;
    },
  },
});

export const {
  setAppLoaderTrue,
  setAppLoaderFalse,
  toggleSidebar,
  toggleMiniSidebar,
} = dashboardSlice.actions;

export const getDashboardData = (state: { dashboard: DashboardState }) =>
  state.dashboard;

export default dashboardSlice.reducer;
