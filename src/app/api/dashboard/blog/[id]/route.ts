import {
  ApiResponse,
  deleteOne,
  findOne,
  throwError,
  updateOne,
} from "@/helpers/server/common";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, values: any) {
  try {
    const { id } = await values.params;
    const rcResponse = new ApiResponse();
    rcResponse.data = await findOne("Blog", { _id: id });
    return NextResponse.json(rcResponse);
  } catch (error) {
    return throwError();
  }
}

export async function PUT(request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const { id: blogId } = await values.params;
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

export async function DELETE(request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const { id: blogId } = await values.params;

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
