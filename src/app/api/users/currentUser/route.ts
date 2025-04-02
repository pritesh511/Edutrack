import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.model";
import { getDataFromToken, getUserDataFromToken } from "@/helpers/getDataFromToken";
import { databaseConnect } from "@/dbConfig/dbConfig";
import { findOne, throwError } from "@/helpers/server/common";

databaseConnect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await getUserDataFromToken(request);

    const userData = await findOne("User", { _id: userId });

    return NextResponse.json(
      {
        user: {
          _id: userData.id,
          schoolName: userData.schoolName,
          email: userData.email,
          role: user.role,
          teacherId: user.teacherId,
          teacherName: user.teacherName,
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
    return throwError();
  }
}
