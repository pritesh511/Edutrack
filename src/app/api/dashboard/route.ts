import { NextRequest, NextResponse } from "next/server";
import { databseConnect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Teacher from "@/models/teacher.model";
import Student from "@/models/student.model";
import Standard from "@/models/standard.model";
import Subject from "@/models/subject.model";

databseConnect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const teachers = await Teacher.find({ user: userId })
      .select("-user -__v")
      .populate("standards")
      .populate("subjects");
    const students = await Student.find({ user: userId }).select("-user -__v");
    const subjects = await Subject.find({ user: userId }).select("-user -__v");
    const standards = await Standard.find({ user: userId }).select(
      "-user -__v"
    );

    return NextResponse.json(
      {
        teachers,
        students,
        subjects,
        standards,
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
