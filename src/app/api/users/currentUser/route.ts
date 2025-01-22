import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.model";
import { getDataFromToken, getUserDataFromToken } from "@/helpers/getDataFromToken";
import { databseConnect } from "@/dbConfig/dbConfig";

databseConnect();

export async function GET(request: NextRequest) {
  try {
    const user = await getUserDataFromToken(request);
    return NextResponse.json(
      {
        user: {
          _id: user.id,
          schoolName: user.schoolName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
