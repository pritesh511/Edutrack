import { getDataFromToken } from "@/helpers/getDataFromToken";
import {
  ApiResponse,
  deleteOne,
  findOne,
  throwError,
} from "@/helpers/server/common";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const userId = await getDataFromToken(request);
    const { id: eventId } = await values.params;
    
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
