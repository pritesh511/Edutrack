import { databseConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // find user if exists
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return NextResponse.json(
        {
          message: "Account does not exists",
        },
        { status: 400 }
      );
    }

    // check is password correct
    const isValidPassword = await bcryptjs.compare(password, findUser.password);
    if (!isValidPassword) {
      return NextResponse.json(
        {
          message: "Invalid Password",
        },
        { status: 400 }
      );
    }

    // create jst token and set to cookies
    const tokenUser = {
      id: findUser._id,
      email: findUser.email,
      schoolName: findUser.schoolName,
    };
    const token = jwt.sign(tokenUser, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "You have successfully login",
        user: findUser,
        token: token,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
