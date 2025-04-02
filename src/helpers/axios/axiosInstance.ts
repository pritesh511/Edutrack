import axios from "axios";
import { config } from "../apiconfig/config";
import { store } from "@/redux/store";
import {
  setAppLoaderFalse,
  setAppLoaderTrue,
} from "@/redux/slices/dashboardSlice";

const fetch = axios.create({
  baseURL: config.API_URL,
});

fetch.interceptors.request.use(
  (request: any) => {
    store.dispatch(setAppLoaderTrue());
    return request;
  },
  (error: any) => {
    store.dispatch(setAppLoaderFalse());
    return Promise.reject(error);
  }
);

fetch.interceptors.response.use(
  (response: any) => {
    store.dispatch(setAppLoaderFalse());
    return response;
  },
  (error: any) => {
    store.dispatch(setAppLoaderFalse());

    const errorObject = {
      code: 500,
      message: "Server not responding",
    };
    if (error.response) {
      errorObject.code = error.response.data.status;
      errorObject.message = error.response.data.message;
      return Promise.reject(errorObject);
    }
  }
);

export default fetch;
