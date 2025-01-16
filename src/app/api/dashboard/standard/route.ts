import { databseConnect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Standard from "@/models/standard.model";
import { NextRequest, NextResponse } from "next/server";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { standard, description } = reqBody;

    const findStd = await Standard.findOne({ standard });

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
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const standards = await Standard.find({ user: userId });

    const isdropdownTrue = request?.nextUrl?.searchParams.get("dropdown");

    const dropdownOptions = standards.map((std) => {
      return {
        label: std.standard,
        value: std._id,
      };
    });

    if (isdropdownTrue) {
      return NextResponse.json(
        {
          standards: dropdownOptions,
        },
        { status: 200 }
      );
    }

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
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const standardId = request?.nextUrl?.searchParams.get("standardId");
    const findStandard = await Standard.findOne({ _id: standardId });
    if (findStandard) {
      await Standard.deleteOne({ _id: standardId });
      return NextResponse.json(
        {
          message: "Standard deleted successfully",
        },
        { status: 200 }
      );
    }
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
    const standardId = request?.nextUrl?.searchParams.get("standardId");
    const reqBody = await request.json();
    const { standard, description } = reqBody;
    const findStandard = await Standard.findOne({ _id: standardId });

    if (!findStandard) {
      return NextResponse.json(
        { message: "Standard not found" },
        { status: 404 }
      );
    }

    // Construct update object dynamically
    const updateFields: Record<string, any> = {};
    if (standard !== undefined) updateFields.standard = standard;
    if (description !== undefined) updateFields.description = description;

    // Update only the fields provided
    await Standard.updateOne({ _id: standardId }, { $set: updateFields });

    return NextResponse.json(
      { message: "Standard updated successfully" },
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
