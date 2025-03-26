import { databseConnect } from "@/dbConfig/dbConfig";
import {
  getDataFromToken,
  getUserDataFromToken,
} from "@/helpers/getDataFromToken";
import {
  ApiResponse,
  create,
  deleteOne,
  find,
  findOne,
  throwError,
  updateOne,
} from "@/helpers/server/common";
import { NextRequest, NextResponse } from "next/server";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const reqBody = await request.json();
    const userId = await getDataFromToken(request);

    const { standard, description } = reqBody;

    const findStd = await findOne("Standard", { standard, user: userId });
    if (findStd) {
      return throwError("Std name already has been taken", 400);
    }

    rcResponse.data = await create("Standard", {
      standard,
      description,
      user: userId,
    });
    rcResponse.message = "You have successfully add standard";
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
    const isdropdownTrue = request?.nextUrl?.searchParams.get("dropdown");

    const standards = await find("Standard", { user: userId });

    if (isdropdownTrue) {
      if (loginUser.role === "admin") {
        const dropdownOptions = standards.map((std: any) => {
          return {
            label: std.standard,
            value: std._id,
          };
        });

        rcResponse.data.standards = dropdownOptions;
        return NextResponse.json(rcResponse);
      } else {
        const teacher = await findOne("Teacher", { _id: loginUser.teacherId });

        const dropdownOptions = teacher.standards.flatMap(
          (teacherStd: string) =>
            standards
              .filter(
                (std: any) => teacherStd.toString() === std._id.toString()
              )
              .map((std: any) => ({
                label: std.standard,
                value: std._id,
              }))
        );

        rcResponse.data.standards = dropdownOptions;
        return NextResponse.json(rcResponse);
      }
    }

    rcResponse.data.standards = standards;
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const standardId = request?.nextUrl?.searchParams.get("standardId");
    if (!standardId) {
      return throwError("Standard ID is required", 400);
    }

    const findStandard = await findOne("Standard", { _id: standardId });
    if (!findStandard) {
      return throwError("Standard not found", 404);
    }

    const linkedTeachers = await find("Teacher", {
      standards: { $in: [standardId] },
    });
    if (linkedTeachers.length > 0) {
      return throwError(
        "Cannot delete the standard as it is linked with teachers",
        400
      );
    }

    rcResponse.data = await deleteOne("Standard", { _id: standardId });
    rcResponse.message = "Standard deleted successfully";
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const standardId = request?.nextUrl?.searchParams.get("standardId");
    const reqBody = await request.json();
    const { standard, description } = reqBody;

    const findStandard = await findOne("Standard", { _id: standardId });
    if (!findStandard) {
      return throwError("Standard not found", 404);
    }

    // Construct update object dynamically
    const updateFields: Record<string, any> = {};
    if (standard !== undefined) updateFields.standard = standard;
    if (description !== undefined) updateFields.description = description;

    // Update only the fields provided
    rcResponse.data = await updateOne(
      "Standard",
      { _id: standardId },
      { $set: updateFields }
    );
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}
