import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
