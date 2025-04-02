import { NextRequest, NextResponse } from "next/server";
import { databseConnect } from "@/dbConfig/dbConfig";
import {
  getDataFromToken,
  getUserDataFromToken,
} from "@/helpers/getDataFromToken";
import bcryptjs from "bcryptjs";
import {
  ApiResponse,
  create,
  find,
  findOne,
  throwError,
} from "@/helpers/server/common";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const reqBody = await request.json();

    const { name, email, experience, educations, standards, subjects } =
      reqBody;

    const userId = await getDataFromToken(request);

    // hash password to store in database
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash("Teacher@123", salt);

    rcResponse.data = await create("Teacher", {
      name,
      email,
      experience,
      educations,
      standards,
      subjects,
      password: hashPassword,
      user: userId,
    });
    rcResponse.message = "You have successfully added a teacher";
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function GET(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const userId = await getDataFromToken(request);
    const loginUser = await getUserDataFromToken(request);

    const teachersData = await find("Teacher", { user: userId });

    const isdropdownTrue = request?.nextUrl?.searchParams.get("dropdown");

    if (isdropdownTrue) {
      if (loginUser.role === "admin") {
        const dropdownOptions = teachersData.map((teacher: any) => {
          return {
            label: teacher.name,
            value: teacher._id,
          };
        });

        rcResponse.data.teachers = dropdownOptions;
        return NextResponse.json(rcResponse);
      } else {
        const findTeacher = await findOne("Teacher", {
          _id: loginUser.teacherId,
        });

        const dropdownOptions = teachersData
          .filter(
            (teacher: any) =>
              teacher._id.toString() == findTeacher._id.toString()
          )
          .map((teacher: any) => {
            return {
              label: teacher.name,
              value: teacher._id,
            };
          });

        rcResponse.data.teachers = dropdownOptions;
      }
    }

    const populates = ["standards", "subjects"];
    const teachers = await find("Teacher", { user: userId }, populates);
    rcResponse.data.teachers = teachers;

    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}
