import axios from "axios";
import { config } from "../apiconfig/config";

const axiosInstance = axios.create({
  baseURL: config.API_URL,
});

axiosInstance.interceptors.request.use((request: any) => {
  return request;
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
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
