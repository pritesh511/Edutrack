import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.model";
import { databseConnect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { schoolName, email, password } = reqBody;

    // first find the user in data base if it exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email is already register",
        },
        { status: 400 }
      );
    }

    // hash password to store in database
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = await new User({
      schoolName,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        message: "You have successfully registerd",
        savedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
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
    const userId = request?.nextUrl?.searchParams.get("userId");
    const findUser = await User.findOne({ _id: userId });
    if (findUser) {
      await User.deleteOne({ _id: userId });
      return NextResponse.json(
        {
          message: "Subject deleted successfully",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}
