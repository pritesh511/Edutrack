import { randomString } from "@/helpers/helper";
import {
  deleteImageFromS3,
  getImageUrl,
  uploadImageToS3,
} from "@/helpers/awsServices";
import Subject from "@/models/subject.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
  try {
    // get id from token user
    const userId = await getDataFromToken(request);

    const subjects = await Subject.find({ user: userId }).lean();
    
    const newsubjectList = await Promise.all(
      subjects.map(async (subject) => {
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
    console.error(error.message);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const subjectName = formData.get("subjectName");
    const description = formData.get("description");
    const file = formData.get("file") as File;

    if (!file && typeof file === "string") {
      return NextResponse.json(
        {
          message: "File is required",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate a random string once
    const randomStr = randomString(5);

    // Create the S3 key
    const s3Key = `subjects/${randomStr + file.name}`;

    await uploadImageToS3(buffer, s3Key, file.type);

    // get id from token
    const userId = await getDataFromToken(request);

    const subject = await Subject.create({
      subjectName,
      description,
      image: s3Key,
      user: userId,
    });

    return NextResponse.json(
      {
        subject,
        message: "Subject added successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const subjectId = request?.nextUrl?.searchParams.get("subjectId");
    const findSubject = await Subject.findOne({ _id: subjectId });
    if (findSubject) {
      await deleteImageFromS3(findSubject.image);
      await Subject.deleteOne({ _id: subjectId });
      return NextResponse.json(
        {
          message: "Subject deleted successfully",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error.message);
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
    const subjectId = request?.nextUrl?.searchParams.get("subjectId");
    const formData = await request.formData();
    const subjectName = formData.get("subjectName");
    const description = formData.get("description");
    const findSubject = await Subject.findOne({ _id: subjectId });

    if (!findSubject) {
      return NextResponse.json(
        { message: "Subject not found" },
        { status: 404 }
      );
    }

    // Construct update object dynamically
    const updateFields: Record<string, any> = {};
    if (subjectName !== undefined) updateFields.subjectName = subjectName;
    if (description !== undefined) updateFields.description = description;

    // Update only the fields provided
    await Subject.updateOne({ _id: subjectId }, { $set: updateFields });

    return NextResponse.json(
      { message: "Subject updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
