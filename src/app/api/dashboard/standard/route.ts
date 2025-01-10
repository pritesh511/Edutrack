import { databseConnect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Standard from "@/models/standard.model";
import { NextRequest, NextResponse } from "next/server";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { standard, description } = reqBody;

    const findStd = await Standard.find({ standard });

    if (findStd) {
      return NextResponse.json(
        {
          message: "Std name already has been taken",
        },
        { status: 400 }
      );
    }

    // get id from token
    const userId = await getDataFromToken(request);

    const standardResp = await new Standard({
      standard,
      description,
      user: userId,
    });

    const savedStandard = await standardResp.save();

    return NextResponse.json(
      {
        savedStandard,
        message: "You have successfully add standard",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: error.status }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const standards = await Standard.find({ user: userId });

    return NextResponse.json(
      {
        standards,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: error.status }
    );
  }
}
