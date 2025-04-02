import { deleteImageFromS3 } from "@/helpers/awsServices";
import {
  ApiResponse,
  deleteOne,
  find,
  findOne,
  throwError,
  updateOne,
} from "@/helpers/server/common";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const { id: subjectId } = await values.params;

    const formData = await request.formData();
    const subjectName = formData.get("subjectName");
    const description = formData.get("description");
    const findSubject = await findOne("Subject", { _id: subjectId });

    if (!findSubject) {
      return throwError("Subject not found", 404);
    }

    // Construct update object dynamically
    const updateFields: Record<string, any> = {};
    if (subjectName !== undefined) updateFields.subjectName = subjectName;
    if (description !== undefined) updateFields.description = description;

    // Update only the fields provided
    rcResponse.data = await updateOne(
      "Subject",
      { _id: subjectId },
      { $set: updateFields }
    );
    rcResponse.message = "Subject updated successfully";

    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function DELETE(_request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const { id: subjectId } = await values.params;

    if (!subjectId) {
      return throwError("Subject ID is required", 400);
    }

    const findSubject = await findOne("Subject", { _id: subjectId });
    if (!findSubject) {
      return throwError("Subject not found", 404);
    }

    const linkedTeachers = await find("Teacher", {
      subjects: { $in: [subjectId] },
    });
    if (linkedTeachers.length > 0) {
      return throwError(
        "Cannot delete the subject as it is linked with teachers",
        400
      );
    }

    // If not linked, proceed with deletion
    await deleteImageFromS3(findSubject.image);

    rcResponse.data = await deleteOne("Subject", { _id: subjectId });
    rcResponse.message = "Subject deleted successfully"
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}
