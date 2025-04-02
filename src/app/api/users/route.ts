import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.model";
import { databaseConnect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

databaseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      schoolName,
      schoolOwnerName,
      email,
      mobileNo,
      address,
      city,
      district,
      pincode,
      password,
    } = reqBody;

    // first find the user in data base if it exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email is already register",
        },
        { status: 400 }
      );
    }

    // hash password to store in database
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = await new User({
      schoolName,
      schoolOwnerName,
      email,
      mobileNo,
      address,
      city,
      district,
      pincode,
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
        message: "Internal Server Error",
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
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = request?.nextUrl?.searchParams?.get("userId");
    const reqBody = await request.json();
    const {
      schoolName,
      schoolOwnerName,
      email,
      mobileNo,
      address,
      city,
      district,
      pincode,
    } = reqBody;

    const findUser = await User.findOne({ _id: userId });
    if (!findUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 400 }
      );
    }

    const updateFields: Record<string, any> = {};

    if (schoolName) updateFields.schoolName = schoolName;
    if (schoolOwnerName) updateFields.schoolOwnerName = schoolOwnerName;
    if (email) updateFields.email = email;
    if (mobileNo) updateFields.mobileNo = mobileNo;
    if (address) updateFields.address = address;
    if (city) updateFields.city = city;
    if (district) updateFields.district = district;
    if (pincode) updateFields.pincode = pincode;

    await User.findOneAndUpdate({ _id: userId }, { $set: updateFields });

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
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
        message: "Internal Server Error",
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
