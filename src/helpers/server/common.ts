import Calender from "@/models/calender.model";
import { NextResponse } from "next/server";

const models: any = {
  Calender,
};

export class ApiResponse {
  constructor() {
    this.staus = 200;
    this.data = {};
    this.success = true;
    this.message = "OK";
  }
  staus: number;
  data: any;
  success: boolean;
  message: string;
}

export const throwError = (
  errorMsg: string = "Internal Server Error",
  status: number = 500
) => {
  const rcResponse = new ApiResponse();
  rcResponse.message = errorMsg;
  rcResponse.staus = status;
  rcResponse.success = false;
  return NextResponse.json(rcResponse, { status: status });
};

export const find = async (collection: any, query: any) => {
  try {
    const queryBuilder = models[collection].find(query).select("-user -__v");
    return await queryBuilder;
  } catch (error: any) {
    throw error;
  }
};

export const create = async (collection: any, body: any) => {
  try {
    const queryBuilder = models[collection].create(body);
    return await queryBuilder;
  } catch (error: any) {
    throw error;
  }
};

export const findOne = async (collection: any, query: any) => {
  try {
    const queryBuilder = models[collection].findOne(query).select("-user -__v");
    return await queryBuilder;
  } catch (error: any) {
    throw error;
  }
};

export const deleteOne = async (collection: any, query: any) => {
  try {
    const queryBuilder = models[collection]
      .deleteOne(query)
      .select("-user -__v");
    return await queryBuilder;
  } catch (error: any) {
    throw error;
  }
};

export default { ApiResponse, throwError, find, findOne, deleteOne };
