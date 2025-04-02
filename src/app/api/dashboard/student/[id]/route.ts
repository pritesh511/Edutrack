import {
  ApiResponse,
  deleteOne,
  findOne,
  throwError,
  updateOne,
} from "@/helpers/server/common";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const { id: studentId} = await values.params

    const findStudent = await findOne("Student", { _id: studentId });
    if (findStudent) {
      rcResponse.data = await deleteOne("Student", { _id: studentId });
      rcResponse.message = "Student deleted successfully";
      return NextResponse.json(rcResponse);
    }
  } catch (error: any) {
    return throwError();
  }
}

export async function PUT(request: NextRequest, values: any) {
    try {
      const rcResponse = new ApiResponse();
      const { id: studentId} = await values.params
      const reqBody = await request.json();
      const {
        name,
        roleNo,
        standard,
        dob,
        address,
        fatherName,
        fatherMobileNo,
        fatherOccupation,
        fatherEmail,
        motherName,
        motherOccupation,
        motherMobileNo,
        classTeacher,
      } = reqBody;
  
      const updateFields: Record<string, any> = {};
  
      if (name) updateFields.name = name;
      if (standard) updateFields.standard = standard;
      if (dob) updateFields.dob = dob;
      if (address) updateFields.address = address;
      if (roleNo) updateFields.roleNo = roleNo;
      if (fatherName) updateFields.fatherName = fatherName;
      if (fatherMobileNo) updateFields.fatherMobileNo = fatherMobileNo;
      if (fatherOccupation) updateFields.fatherOccupation = fatherOccupation;
      if (fatherEmail) updateFields.fatherEmail = fatherEmail;
      if (motherName) updateFields.motherName = motherName;
      if (motherOccupation) updateFields.motherOccupation = motherOccupation;
      if (motherMobileNo) updateFields.motherMobileNo = motherMobileNo;
      if (classTeacher) updateFields.classTeacher = classTeacher;
  
      rcResponse.data = await updateOne(
        "Student",
        { _id: studentId },
        { $set: updateFields }
      );
      rcResponse.message = "Student updated successfully";
  
      return NextResponse.json(rcResponse);
    } catch (error: any) {
      return throwError();
    }
  }
