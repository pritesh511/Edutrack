import { randomString } from "@/helpers/helper";
import {
  generateUrl,
  getImageUrl,
  uploadImageToS3,
} from "@/helpers/imageServices";
import Subject from "@/models/subject.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const subjects = await Subject.find();
    const newsubjectList = [];
    for (const subject of subjects) {
      const url = await getImageUrl(subject.image);
      newsubjectList.push({
        ...subject, // Retain all existing properties of the subject
        image: url, // Replace the image with the resolved URL
      });
    }

    console.log(newsubjectList);
    return NextResponse.json(
      {
        newsubjectList,
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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const subjectName = formData.get("subjectName");
    const description = formData.get("description");
    const file = formData.get("file") as File;
    console.log(subjectName, description, file);

    if (!file && typeof file === "string") {
      return NextResponse.json(
        {
          message: "File is required",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadImageToS3(
      buffer,
      `subjects/${file.name + randomString(5)}`,
      file.type
    );

    const subject = await Subject.create({
      subjectName,
      description,
      image: `subjects/${file.name + randomString(5)}`,
    });

    return NextResponse.json(
      {
        data: subject,
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
