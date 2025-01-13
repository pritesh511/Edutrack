import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import dashboardReducer from "./slices/dashboardSlice";
import { standardApi } from "./query/standard";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  [standardApi.reducerPath]: standardApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(standardApi.middleware),
});

setupListeners(store.dispatch);

export default store;
