import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import dashboardReducer from "./slices/dashboardSlice";
import { standardApi } from "./query/standard";
import { subjectApi } from "./query/subject";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  [standardApi.reducerPath]: standardApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(standardApi.middleware)
      .concat(subjectApi.middleware),
});

setupListeners(store.dispatch);

export default store;