import axios from "axios";
import { config } from "../apiconfig/config";
import store from "@/redux/store";
import {
  setAppLoaderFalse,
  setAppLoaderTrue,
} from "@/redux/slices/dashboardSlice";

const axiosInstance = axios.create({
  baseURL: config.API_URL,
});

axiosInstance.interceptors.request.use(
  (request: any) => {
    // Dispatch showLoader action
    store.dispatch(setAppLoaderTrue());
    return request;
  },
  (error: any) => {
    // Ensure loader is hidden even on request error
    store.dispatch(setAppLoaderFalse());
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: any) => {
    // Dispatch hideLoader action
    store.dispatch(setAppLoaderFalse());
    return response;
  },
  (error: any) => {
    // Ensure loader is hidden even on response error
    store.dispatch(setAppLoaderFalse());

    const errorObject = {
      code: 500,
      message: "Server not responding",
    };
    if (error.response) {
      if (error.response.status === 500) return Promise.reject(errorObject);
      errorObject.code = error.response.status;
      errorObject.message = error.response.data;
      return Promise.reject(errorObject);
    } else if (error.request) {
      return Promise.reject(errorObject);
    } else {
      errorObject.message = "Something went wrong";
      return Promise.reject(errorObject);
    }
  }
);

export default axiosInstance;
