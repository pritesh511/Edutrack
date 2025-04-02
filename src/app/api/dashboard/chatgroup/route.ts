import { databseConnect } from "@/dbConfig/dbConfig";
import {
  getDataFromToken,
  getUserDataFromToken,
} from "@/helpers/getDataFromToken";
import {
  ApiResponse,
  create,
  find,
  findOne,
  throwError,
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
    const userId = await getDataFromToken(request);
    const loginUser = await getUserDataFromToken(request);

    const populates = ["members"];
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
  } catch (error: any) {
    return throwError();
  }
}
