"use server";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import { BASE_URL } from "@/utils/constant";
import { eventSchema } from "@/utils/schema";
import axios from "axios";

export const addEvent = async (_prevState: any, formData: FormData) => {
  const eventData = {
    title: formData.get("title"),
  };
  try {
    await eventSchema.validate(eventData, { abortEarly: false });

    console.log("called");
    const { data, status } = await axios.post(`${BASE_URL}/dashboard/calender`, eventData);

    console.log("called");

    console.log(data, status);

    if (status === 200) {
      return {
        message: data.message,
      };
    }
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return {
        validationErrors: transformYupErrorsIntoObject(error),
      };
    }

    return { error: error?.message || "Something went wrong" };
  }
};
