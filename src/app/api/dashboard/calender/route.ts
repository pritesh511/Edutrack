import { NextRequest, NextResponse } from "next/server";
import { databseConnect } from "@/dbConfig/dbConfig";
import Calender from "@/models/calender.model";
import { getDataFromToken } from "@/helpers/getDataFromToken";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userId = await getDataFromToken(request);

    const { title, start, end } = reqBody;

    if (!title) {
      return NextResponse.json(
        {
          message: "Please enter title",
        },
        { status: 400 }
      );
    }

    const event = await new Calender({
      title,
      start,
      end,
      user: userId,
    });

    await event.save();

    return NextResponse.json(
      {
        message: "Successfully added event",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const events = await Calender.find({ user: userId }).select("-user -__v");

    return NextResponse.json({ events }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const eventId = request?.nextUrl?.searchParams.get("eventId");
    const userId = await getDataFromToken(request);

    if (!eventId) {
      return NextResponse.json(
        { message: "Evnet Id not found" },
        { status: 400 }
      );
    }

    const event = await Calender.findOne({
      user: userId,
      _id: eventId,
    });

    if (!event) {
      return NextResponse.json({ message: "Evnet not found" }, { status: 400 });
    }

    await Calender.deleteOne({ _id: eventId });

    return NextResponse.json(
      {
        message: "Event deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
