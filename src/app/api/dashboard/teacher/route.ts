import { NextRequest, NextResponse } from "next/server";
import { databseConnect } from "@/dbConfig/dbConfig";
import Teacher from "@/models/teacher.model";
import { getDataFromToken } from "@/helpers/getDataFromToken";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { name, experience, educations, standards, subjects } = reqBody;

    const userId = await getDataFromToken(request);

    const teachersResp = new Teacher({
      name,
      experience,
      educations,
      standards,
      subjects,
      user: userId,
    });

    await teachersResp.save();

    return NextResponse.json(
      {
        message: "You have successfully added a teacher",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in POST:", error);
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

    const teachers = await Teacher.find({ user: userId })
      .select("-user -__v")
      .populate("standards")
      .populate("subjects");

    return NextResponse.json(
      {
        teachers,
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
    const teacherId = request?.nextUrl?.searchParams.get("teacherId");
    const findTeacher = await Teacher.findOne({ _id: teacherId });
    if (findTeacher) {
      await Teacher.deleteOne({ _id: teacherId });
      return NextResponse.json(
        {
          message: "Teacher deleted successfully",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
