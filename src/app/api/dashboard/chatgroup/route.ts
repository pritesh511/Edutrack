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
    const { groupName, members } = reqBody;

    const findGroupName = await findOne("ChatGroup", {
      groupName,
      user: userId,
    });

    if (findGroupName) {
      return throwError("Group name already has been taken", 400);
    }

    rcResponse.data = await create("ChatGroup", {
      groupName,
      members,
      createAt: new Date(),
      user: userId,
    });
    rcResponse.message = "You have successfully created group";
    return NextResponse.json(rcResponse);
  } catch (error: any) {
    return throwError();
  }
}

export async function GET(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const groupId = request.nextUrl.searchParams.get("groupId");
    const userId = await getDataFromToken(request);
    const loginUser = await getUserDataFromToken(request);

    const populates = ["members"];
    if (!groupId) {
      const groups = await find("ChatGroup", { user: userId }, populates);
      if (loginUser.role === "admin") {
        for (const group of groups) {
          for (const member of group.members) {
            member.standards = await find("Standard", {
              _id: { $in: member.standards },
            });
            member.subjects = await find("Subject", {
              _id: { $in: member.subjects },
            });
          }
        }

        rcResponse.data.groups = groups;

        return NextResponse.json(rcResponse);
      } else {
        const filterGroups = groups.filter((group: { members: any[] }) => {
          let value = false;
          group.members.forEach((member: any) => {
            if (member._id.toString() === loginUser.teacherId.toString()) {
              value = true;
            }
          });
          return value;
        });

        for (const group of filterGroups) {
          for (const member of group.members) {
            member.standards = await find("Standard", {
              _id: { $in: member.standards },
            });
            member.subjects = await find("Subject", {
              _id: { $in: member.subjects },
            });
          }
        }

        rcResponse.data.groups = filterGroups;
        return NextResponse.json(rcResponse);
      }
    } else {
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
    }
  } catch (error: any) {
    return throwError();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const userId = await getDataFromToken(request);

    const groupId = request?.nextUrl?.searchParams.get("groupId");
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

export async function PUT(request: NextRequest) {
  try {
    const rcResponse = new ApiResponse();
    const userId = await getDataFromToken(request);
    const groupId = request?.nextUrl?.searchParams.get("groupId");
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
