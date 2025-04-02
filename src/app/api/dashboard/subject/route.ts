import { randomString } from "@/helpers/helper";
import { getImageUrl, uploadImageToS3 } from "@/helpers/awsServices";
import Subject from "@/models/subject.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { ApiResponse, create, find, throwError } from "@/helpers/server/common";

export async function GET(request: NextRequest) {
  try {
    // get id from token user
    const userId = await getDataFromToken(request);

    const subjects = await find("Subject", { user: userId });

    const isdropdownTrue = request?.nextUrl?.searchParams.get("dropdown");

    const dropdownOptions = subjects.map((sub: any) => {
      return {
        label: sub.subjectName,
        value: sub._id,
      };
    });

    if (isdropdownTrue) {
      return NextResponse.json(
        {
          subjects: dropdownOptions,
        },
        { status: 200 }
      );
    }

    const newsubjectList = await Promise.all(
      subjects.map(async (subject: any) => {
        const url = await getImageUrl(subject.image);
        return {
          ...subject,
          image: url,
        };
      })
    );

    return NextResponse.json(
      {
        subjects: newsubjectList,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return throwError();
  }
}

export async function POST(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const formData = await request.formData();
    const subjectName = formData.get("subjectName");
    const description = formData.get("description");
    const file = formData.get("file") as File;

    if (!file && typeof file === "string") {
      return throwError("File is required", 400);
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate a random string once
    const randomStr = randomString(5);

    // Create the S3 key
    const s3Key = `subjects/${randomStr + file.name}`;

    await uploadImageToS3(buffer, s3Key, file.type);

    // get id from token
    const userId = await getDataFromToken(request);

    rcResponse.data = await create("Subject", {
      subjectName,
      description,
      image: s3Key,
      user: userId,
    });
    rcResponse.message = "Subject added successfully.";
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}
