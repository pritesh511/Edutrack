import { getDataFromToken } from "@/helpers/getDataFromToken";
import {
  ApiResponse,
  deleteOne,
  find,
  findOne,
  throwError,
  updateOne,
} from "@/helpers/server/common";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const { id: groupId } = await values.params;
    const userId = await getDataFromToken(request);

    const populates = ["members"];
    const group = await findOne(
      "ChatGroup",
      { user: userId, _id: groupId },
      populates
    );

    for (const member of group.members) {
      member.standards = await find("Standard", {
        _id: { $in: member.standards },
      });
      member.subjects = await find("Subject", {
        _id: { $in: member.subjects },
      });
    }

    rcResponse.data.group = group;
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function DELETE(request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const userId = await getDataFromToken(request);
    const { id: groupId } = await values.params;

    if (!groupId) {
      return throwError("group ID is required", 400);
    }

    const findGroup = await findOne("ChatGroup", {
      _id: groupId,
      user: userId,
    });
    if (!findGroup) {
      return throwError("Group not found", 404);
    }

    rcResponse.data = await deleteOne("ChatGroup", { _id: groupId });
    rcResponse.message = "Group deleted successfully";
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function PUT(request: NextRequest, values: any) {
  try {
    const rcResponse = new ApiResponse();
    const userId = await getDataFromToken(request);
    const { id: groupId } = await values.params;
    const reqBody = await request.json();

    const { groupName, members } = reqBody;

    const findGroup = await findOne("ChatGroup", {
      _id: groupId,
      user: userId,
    });
    if (!findGroup) {
      return throwError("Group Not Found", 404);
    }

    const updateFields: Record<string, any> = {};
    if (groupName) updateFields.groupName = groupName;
    if (members.length > 0) updateFields.members = members;

    // update data
    rcResponse.data = await updateOne(
      "ChatGroup",
      { _id: groupId },
      { $set: updateFields }
    );
    rcResponse.message = "Group updated successfully";
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}
