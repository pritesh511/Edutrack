import { databseConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import Teacher from "@/models/teacher.model";

databseConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, schoolEmail, role } = reqBody;

    if (role === "admin") {
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
      const isValidPassword = await bcryptjs.compare(
        password,
        findUser.password
      );
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
        role: role,
        teacherId: null,
        schoolOwnerName: findUser.schoolOwnerName,
        mobileNo: findUser.mobileNo,
        address: findUser.address,
        city: findUser.city,
        district: findUser.district,
        pincode: findUser.pincode,
      };

      const token = jwt.sign(tokenUser, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const user = await User.findOne({ email }).select("-password");

      const response = NextResponse.json(
        {
          message: "You have successfully login",
          success: true,
          user: {
            _id: user._id,
            schoolName: user.schoolName,
            email: user.email,
            role: role,
            teacherId: null,
            schoolOwnerName: findUser.schoolOwnerName,
        mobileNo: findUser.mobileNo,
        address: findUser.address,
        city: findUser.city,
        district: findUser.district,
        pincode: findUser.pincode,
          },
          token: token,
        },
        { status: 200 }
      );

      response.cookies.set("token", token, { httpOnly: true });

      return response;
    } else {
      const findSchool = await User.findOne({ email: schoolEmail });

      if (!findSchool) {
        return NextResponse.json(
          {
            message: "School not found",
          },
          { status: 400 }
        );
      };

      const findTeacher = await Teacher.findOne({ user: findSchool._id, email: email });

      if (!findTeacher) {
        return NextResponse.json(
          {
            message: "Teacher not found in this school",
          },
          { status: 400 }
        );
      };

      // check is password correct
      const isValidPassword = await bcryptjs.compare(
        password,
        findTeacher.password
      );
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
        id: findSchool._id,
        schoolName: findTeacher.name,
        email: findTeacher.email,
        role: role,
        teacherId: findTeacher._id,
        schoolOwnerName: findSchool.schoolOwnerName,
        mobileNo: findSchool.mobileNo,
        address: findSchool.address,
        city: findSchool.city,
        district: findSchool.district,
        pincode: findSchool.pincode,
      };

      const token = jwt.sign(tokenUser, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json(
        {
          message: "You have successfully login",
          success: true,
          user: {
            _id: findTeacher._id,
            schoolName: findTeacher.name,
            email: findTeacher.email,
            role: role,
            teacherId: findTeacher._id
          },
          token: token,
        },
        { status: 200 }
      );

      response.cookies.set("token", token, { httpOnly: true });

      return response;
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
