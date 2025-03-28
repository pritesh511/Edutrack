import { NextRequest, NextResponse } from "next/server";
import { databseConnect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import {
  ApiResponse,
  create,
  deleteOne,
  find,
  findOne,
  throwError,
} from "@/helpers/server/common";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const reqBody = await request.json();
    const userId = await getDataFromToken(request);

    const { title, start, end } = reqBody;

    rcResponse.data = await create("Calender", {
      title,
      start,
      end,
      user: userId,
    });
    rcResponse.message = "Successfully added event";
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    console.log(error);
    return throwError();
  }
}

export async function GET(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const userId = await getDataFromToken(request);
    rcResponse.data.events = await find("Calender", { user: userId });
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const userId = await getDataFromToken(request);
    
    const eventId = request?.nextUrl?.searchParams.get("eventId");
    if (!eventId) {
      return throwError("Evnet Id not found", 400);
    }

    const event = await findOne("Calender", {
      user: userId,
      _id: eventId,
    });
    if (!event) {
      return throwError("Evnet not found", 400);
    }

    rcResponse.data = await deleteOne("Calender", { _id: eventId });
    rcResponse.message = "Event deleted successfully";
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}
