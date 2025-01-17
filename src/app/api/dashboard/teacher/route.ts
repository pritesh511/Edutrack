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

    const standards = await Teacher.find({ user: userId }).select("-user -__v");

    const isdropdownTrue = request?.nextUrl?.searchParams.get("dropdown");

    const dropdownOptions = standards.map((teacher) => {
      return {
        label: teacher.name,
        value: teacher._id,
      };
    });

    if (isdropdownTrue) {
      return NextResponse.json(
        {
          teachers: dropdownOptions,
        },
        { status: 200 }
      );
    }

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

export async function PUT(request: NextRequest) {
  try {
    const teacherId = request?.nextUrl?.searchParams.get("teacherId");
    const reqBody = await request.json();
    const { name, experience, educations, standards, subjects } = reqBody;

    const findTeacher = await Teacher.findOne({ _id: teacherId });
    if (!findTeacher) {
      return NextResponse.json(
        {
          message: "Teacher Not Found",
        },
        { status: 400 }
      );
    }

    const updateFields: Record<string, any> = {};

    if (name) updateFields.name = name;
    if (experience) updateFields.experience = experience;
    if (educations.length > 0) updateFields.educations = educations;
    if (standards.length > 0) updateFields.standards = standards;
    if (subjects.length > 0) updateFields.subjects = subjects;

    // update data
    await Teacher.updateOne({ _id: teacherId }, { $set: updateFields });

    return NextResponse.json(
      {
        message: "Teacher updated successfully",
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
