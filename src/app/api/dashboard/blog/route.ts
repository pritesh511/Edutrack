import { databaseConnect } from "@/dbConfig/dbConfig";
import { ApiResponse, create, find, throwError } from "@/helpers/server/common";
import { NextRequest, NextResponse } from "next/server";

databaseConnect();

export async function POST(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const body = await request.json();

    rcResponse.data = await create("Blog", body);
    return NextResponse.json(rcResponse);
  } catch (error) {
    return throwError();
  }
}

export async function GET() {
  try {
    const rcResponse = new ApiResponse();
    rcResponse.data = await find("Blog", {});
    return NextResponse.json(rcResponse);
  } catch (error) {
    return throwError();
  }
}
