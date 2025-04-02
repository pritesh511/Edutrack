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
    const { id: teacherId } = await values.params;

    const reqBody = await request.json();
    const { name, email, experience, educations, standards, subjects } =
      reqBody;

    const findTeacher = await findOne("Teacher", { _id: teacherId });
    if (!findTeacher) {
      return throwError("Teacher Not Found", 400);
    }

    const updateFields: Record<string, any> = {};

    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (experience) updateFields.experience = experience;
    if (educations.length > 0) updateFields.educations = educations;
    if (standards.length > 0) updateFields.standards = standards;
    if (subjects.length > 0) updateFields.subjects = subjects;

    // update data
    rcResponse.data = await updateOne(
      "Teacher",
      { _id: teacherId },
      { $set: updateFields }
    );
    rcResponse.message = "Teacher updated successfully";
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function DELETE(_request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const { id: teacherId } = await values.params;

    if (!teacherId) {
      return throwError("Teacher ID is required", 400);
    }

    const findTeacher = await findOne("Teacher", { _id: teacherId });
    if (!findTeacher) {
      return throwError("Subject not found", 404);
    }

    const linkedTeachers = await find("Student", {
      classTeacher: teacherId,
    });
    if (linkedTeachers.length > 0) {
      return throwError(
        "Cannot delete the teacher as it is linked with student",
        400
      );
    }

    const isLinkedWithChatGroup = await find("ChatGroup", {
      members: { $in: [teacherId] },
    });
    if (isLinkedWithChatGroup.length > 0) {
      return throwError(
        "Cannot delete the teacher as it is linked with chat group",
        400
      );
    }

    if (findTeacher) {
      rcResponse.data = await deleteOne("Teacher", { _id: teacherId });
      rcResponse.message = "Teacher deleted successfully";
      return NextResponse.json(rcResponse);
    }
  } catch (error: any) {
    return throwError();
  }
}
