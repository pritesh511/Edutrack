import {
  ApiResponse,
  deleteOne,
  find,
  findOne,
  throwError,
  updateOne,
} from "@/helpers/server/common";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const { id: standardId } = await values.params;
    if (!standardId) {
      return throwError("Standard ID is required", 400);
    }

    const findStandard = await findOne("Standard", { _id: standardId });
    if (!findStandard) {
      return throwError("Standard not found", 404);
    }

    const linkedTeachers = await find("Teacher", {
      standards: { $in: [standardId] },
    });
    if (linkedTeachers.length > 0) {
      return throwError(
        "Cannot delete the standard as it is linked with teachers",
        400
      );
    }

    rcResponse.data = await deleteOne("Standard", { _id: standardId });
    rcResponse.message = "Standard deleted successfully";
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function PUT(request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const { id: standardId } = await values.params;
    const reqBody = await request.json();
    const { standard, description } = reqBody;

    const findStandard = await findOne("Standard", { _id: standardId });
    if (!findStandard) {
      return throwError("Standard not found", 404);
    }

    // Construct update object dynamically
    const updateFields: Record<string, any> = {};
    if (standard !== undefined) updateFields.standard = standard;
    if (description !== undefined) updateFields.description = description;

    // Update only the fields provided
    rcResponse.data = await updateOne(
      "Standard",
      { _id: standardId },
      { $set: updateFields }
    );
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}
