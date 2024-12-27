import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "You have logout successfully",
      },
      { status: 200 }
    );

    // delete the user cookie
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    // return response
    return response;
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
