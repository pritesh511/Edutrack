import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.model";
import { getDataFromToken, getUserDataFromToken } from "@/helpers/getDataFromToken";
import { databseConnect } from "@/dbConfig/dbConfig";

databseConnect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await getUserDataFromToken(request);

    const userData = await User.findOne({ _id: userId }).select("-__v");

    return NextResponse.json(
      {
        user: {
          _id: userData.id,
          schoolName: userData.schoolName,
          email: userData.email,
          role: user.role,
          teacherId: userData.teacherId,
          schoolOwnerName: userData.schoolOwnerName,
          mobileNo: userData.mobileNo,
          address: userData.address,
          city: userData.city,
          district: userData.district,
          pincode: userData.pincode,
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
