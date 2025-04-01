import { ApiResponse, findOne, throwError } from "@/helpers/server/common";
import { NextRequest, NextResponse } from "next/server";

interface Values {
  params: {
    id: string;
  };
};

export async function GET(_request: NextRequest, values: Values) {
  try {
    const { id } = await values.params;
    console.log(id);
    const rcResponse = new ApiResponse();
    rcResponse.data = await findOne("Blog", { _id: id});
    return NextResponse.json(rcResponse);
  } catch (error) {
    return throwError();
  }
}
