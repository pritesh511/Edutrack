import { ApiResponse, findOne, throwError } from "@/helpers/server/common";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, values: any) {
  try {
    const { id } = await values.params;
    const rcResponse = new ApiResponse();
    rcResponse.data = await findOne("Blog", { _id: id});
    return NextResponse.json(rcResponse);
  } catch (error) {
    return throwError();
  }
}
