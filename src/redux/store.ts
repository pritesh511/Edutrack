import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import dashboardReducer from "./slices/dashboardSlice";
import userReducer from "./slices/userSlice";
import { standardApi } from "./query/standard";
import { subjectApi } from "./query/subject";
import { teacherApi } from "./query/teacher";
import { studentApi } from "./query/student";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  user: userReducer,
  [standardApi.reducerPath]: standardApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
  [teacherApi.reducerPath]: teacherApi.reducer,
  [studentApi.reducerPath]: studentApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(standardApi.middleware)
      .concat(subjectApi.middleware)
      .concat(teacherApi.middleware)
      .concat(studentApi.middleware),
});

setupListeners(store.dispatch);

export default store;
