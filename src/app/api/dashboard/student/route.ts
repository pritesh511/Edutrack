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
  updateOne,
} from "@/helpers/server/common";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const reqBody = await request.json();

    const userId = await getDataFromToken(request);

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

    const isRoleNumberTaken = await findOne("Student", {
      roleNo,
      standard: standard,
      user: userId,
    });
    if (isRoleNumberTaken) {
      return throwError("Role number is already been taken", 400);
    }

    rcResponse.data = await create("Student", {
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
      user: userId,
    });
    rcResponse.message = "You have successfully added student";

    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function GET(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const queryParams = request?.nextUrl?.searchParams;
    const filters: any = {};
    const userId = await getDataFromToken(request);

    filters.user = userId;

    queryParams.forEach((value, key) => {
      if (key !== "user") {
        filters[key] = value;
      }
    });

    const populates = ["standard", "classTeacher"];
    const students = await find("Student", filters, populates);
    rcResponse.data.students = students;
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const studentId = request?.nextUrl?.searchParams?.get("studentId");

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

export async function PUT(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const studentId = request?.nextUrl?.searchParams?.get("studentId");
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
