import { databseConnect } from "@/dbConfig/dbConfig";
import {
  getDataFromToken,
  getUserDataFromToken,
} from "@/helpers/getDataFromToken";
import ChatGroup from "@/models/chatgroup.model";
import Standard from "@/models/standard.model";
import Subject from "@/models/subject.model";
import { NextRequest, NextResponse } from "next/server";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const userId = await getDataFromToken(request);

    const { groupName, members } = reqBody;

    const findGroupName = await ChatGroup.findOne({ groupName, user: userId });

    if (findGroupName) {
      return NextResponse.json(
        {
          message: "Group name already has been taken",
        },
        { status: 400 }
      );
    }

    const groupResponse = await new ChatGroup({
      groupName,
      members,
      createAt: new Date(),
      user: userId,
    });

    await groupResponse.save();

    return NextResponse.json(
      {
        message: "You have successfully created group",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const groupId = request.nextUrl.searchParams.get("groupId");
    const userId = await getDataFromToken(request);
    const loginUser = await getUserDataFromToken(request);

    if (!groupId) {
      if (loginUser.role === "admin") {
        const groups = await ChatGroup.find({ user: userId })
          .select("-user -__v")
          .populate("members", "-user -password -__v");

        for (const group of groups) {
          for (const member of group.members) {
            member.standards = await Standard.find({
              _id: { $in: member.standards },
            }).select("-user -__v");
            member.subjects = await Subject.find({
              _id: { $in: member.subjects },
            }).select("-user -__v");
          }
        }

        return NextResponse.json(
          {
            groups,
          },
          { status: 200 }
        );
      } else {
        const groups = await ChatGroup.find({ user: userId })
          .select("-user -__v")
          .populate("members", "-user -password -__v");

        const filterGroups = groups.filter((group) => {
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
            member.standards = await Standard.find({
              _id: { $in: member.standards },
            }).select("-user -__v");
            member.subjects = await Subject.find({
              _id: { $in: member.subjects },
            }).select("-user -__v");
          }
        }

        return NextResponse.json(
          {
            groups: filterGroups,
          },
          { status: 200 }
        );
      }
    } else {
      const group = await ChatGroup.findOne({ user: userId, _id: groupId })
        .select("-user -__v")
        .populate("members", "-user -password -__v");

      for (const member of group.members) {
        member.standards = await Standard.find({
          _id: { $in: member.standards },
        }).select("-user -__v");
        member.subjects = await Subject.find({
          _id: { $in: member.subjects },
        }).select("-user -__v");
      }

      return NextResponse.json(
        {
          group,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const groupId = request?.nextUrl?.searchParams.get("groupId");

    if (!groupId) {
      return NextResponse.json(
        {
          message: "group ID is required",
        },
        { status: 400 }
      );
    }

    const findGroup = await ChatGroup.findOne({ _id: groupId, user: userId });

    if (!findGroup) {
      return NextResponse.json(
        {
          message: "Group not found",
        },
        { status: 404 }
      );
    }

    await ChatGroup.deleteOne({ _id: groupId });

    return NextResponse.json(
      {
        message: "Group deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
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
    const userId = await getDataFromToken(request);

    const groupId = request?.nextUrl?.searchParams.get("groupId");

    const reqBody = await request.json();

    const { groupName, members } = reqBody;

    const findGroup = await ChatGroup.findOne({ _id: groupId, user: userId });
    if (!findGroup) {
      return NextResponse.json(
        {
          message: "Group Not Found",
        },
        { status: 400 }
      );
    }

    const updateFields: Record<string, any> = {};

    if (groupName) updateFields.groupName = groupName;
    if (members.length > 0) updateFields.members = members;

    // update data
    await ChatGroup.updateOne({ _id: groupId }, { $set: updateFields });

    return NextResponse.json(
      {
        message: "Group updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}