import { NextRequest, NextResponse } from "next/server";
import { databseConnect } from "@/dbConfig/dbConfig";
import Student from "@/models/student.model";
import { getDataFromToken } from "@/helpers/getDataFromToken";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const userId = await getDataFromToken(request);

    const {
      name,
      roleNo,
      standard,
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

    const isRoleNumberTaken = await Student.findOne({ roleNo, user: userId });

    if (isRoleNumberTaken) {
      return NextResponse.json(
        {
          message: "Role number is already been taken",
        },
        { status: 400 }
      );
    }

    const saveStudent = new Student({
      name,
      roleNo,
      standard,
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

    await saveStudent.save();

    return NextResponse.json(
      {
        message: "You have successfully added student",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const students = await Student.find({ user: userId })
      .select("-user -__v")
      .populate("standard")
      .populate("classTeacher");

    return NextResponse.json(
      {
        students,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const studentId = request?.nextUrl?.searchParams?.get("studentId");

    const findStudent = await Student.findOne({ _id: studentId });

    if (findStudent) {
      await Student.deleteOne({ _id: studentId });
      return NextResponse.json(
        {
          message: "Student deleted successfully",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const studentId = request?.nextUrl?.searchParams?.get("studentId");
    const reqBody = await request.json();
    const {
      name,
      roleNo,
      standard,
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

    await Student.updateOne({ _id: studentId }, { $set: updateFields });

    return NextResponse.json(
      {
        message: "Student updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
