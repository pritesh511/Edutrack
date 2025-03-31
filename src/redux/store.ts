import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import dashboardReducer from "./slices/dashboardSlice";
import userReducer from "./slices/userSlice";
import { standardApi } from "./query/standard";
import { subjectApi } from "./query/subject";
import { teacherApi } from "./query/teacher";
import { studentApi } from "./query/student";
import { dashboardApi } from "./query/dashboard";
import { chatgroupApi } from "./query/chatgroup";
import { calenderApi } from "./query/calender";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { blogApi } from "./query/blog";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  user: userReducer,
  [standardApi.reducerPath]: standardApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
  [teacherApi.reducerPath]: teacherApi.reducer,
  [studentApi.reducerPath]: studentApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [chatgroupApi.reducerPath]: chatgroupApi.reducer,
  [calenderApi.reducerPath]: calenderApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(standardApi.middleware)
      .concat(subjectApi.middleware)
      .concat(teacherApi.middleware)
      .concat(studentApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(chatgroupApi.middleware)
      .concat(calenderApi.middleware)
      .concat(blogApi.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { persistor, store };
