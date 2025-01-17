import { NextRequest, NextResponse } from "next/server";
import { databseConnect } from "@/dbConfig/dbConfig";
import Student from "@/models/student.model";
import { getDataFromToken } from "@/helpers/getDataFromToken";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const userId = await getDataFromToken(request);

    const { name, roleNo, mobileNo, standard, address } = reqBody;

    const isRoleNumberTaken = await Student.findOne({ roleNo });

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
      mobileNo,
      standard,
      address,
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
      .populate("standard");

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
    const { name, roleNo, mobileNo, standard, address } = reqBody;

    const updateFields: Record<string, any> = {};

    if (name) updateFields.name = name;
    if (mobileNo) updateFields.mobileNo = mobileNo;
    if (standard) updateFields.standard = standard;
    if (address) updateFields.address = address;
    if (roleNo) updateFields.roleNo = roleNo;

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
