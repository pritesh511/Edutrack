import { databseConnect } from "@/dbConfig/dbConfig";
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
    const body = await request.json();

    rcResponse.data = await create("Blog", body);

    return NextResponse.json(rcResponse);
  } catch (error) {
    return throwError();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const blogId = request.nextUrl.searchParams.get("blogId");
    const body = await request.json();

    if (!blogId) {
      return throwError("Blog ID is required", 400);
    }

    const findBlog = await findOne("Blog", { _id: blogId });
    if (!findBlog) {
      return throwError("Blog not found", 404);
    }

    rcResponse.data = await updateOne("Blog", { _id: blogId }, body);
    return NextResponse.json(rcResponse);
  } catch (error) {
    return throwError();
  }
}

export async function GET() {
  try {
    const rcResponse = new ApiResponse();
    rcResponse.data = await find("Blog", {});
    return NextResponse.json(rcResponse);
  } catch (error) {
    return throwError();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const blogId = request.nextUrl.searchParams.get("blogId");

    if (!blogId) {
      return throwError("Blog ID is required", 400);
    }

    const findBlog = await findOne("Blog", { _id: blogId });
    if (!findBlog) {
      return throwError("Blog not found", 404);
    }

    rcResponse.data = await deleteOne("Blog", { _id: blogId });
    rcResponse.message = "Blog deleted successfully.";
    return NextResponse.json(rcResponse);
  } catch (error) {
    return throwError();
  }
}
