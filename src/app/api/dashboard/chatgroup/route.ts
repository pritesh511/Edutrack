import { databseConnect } from "@/dbConfig/dbConfig";
import {
  getDataFromToken,
} from "@/helpers/getDataFromToken";
import ChatGroup from "@/models/chatgroup.model";
import Standard from "@/models/standard.model";
import { NextRequest, NextResponse } from "next/server";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const userId = await getDataFromToken(request);

    const { groupName, members } = reqBody;

    const findGroupName = await Standard.findOne({ groupName, user: userId });

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
    const userId = await getDataFromToken(request);

    const groups = await ChatGroup.find({ user: userId })
      .select("-user -__v")
      .populate({
        path: "members",
        select: "-user -password -__v",
        populate: [
          {
            path: "standards",
            select: "-user -__v",
          },
          {
            path: "subjects",
            select: "-user -__v",
          },
        ],
      });

    return NextResponse.json(
      {
        groups,
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

    const { groupName, members } =
      reqBody;

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
