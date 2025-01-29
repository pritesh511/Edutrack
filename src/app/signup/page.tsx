"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CircularProgress from "@/components/common/CircularProgress";
import CustomTextField from "@/components/common/CustomTextField";
import {
  renderOnConditionBase,
  transformYupErrorsIntoObject,
} from "@/helpers/helper";
import { signupSchema } from "@/utils/schema";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignPage = () => {
  const router = useRouter();
  const [schoolData, setSchoolData] = useState({
    schoolName: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSchoolData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickInput = (name: string) => {
    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSignup = async () => {
    try {
      await signupSchema.validate(schoolData, { abortEarly: false });

      setLoading(true);
      const postUser = await axios.post("/api/users", schoolData);
      toast.success(postUser.data.message);
      setSchoolData({
        schoolName: "",
        email: "",
        password: "",
        confirm_password: "",
      });
      router.push("/login");
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        const errors = transformYupErrorsIntoObject(error);
        setErrors(errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full py-8 flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-lg p-4 shadow-lg">
        <CardHeader className="p-4">
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col gap-2">
            <CustomTextField
              label="School Name*"
              fieldName="schoolName"
              placeholder="Enter your email"
              value={schoolData.schoolName}
              onChangeInput={(event) => handleChangeData(event)}
              error={errors?.schoolName}
              onClickInput={() => handleClickInput("schoolName")}
            />
            <CustomTextField
              label="Email*"
              fieldName="email"
              placeholder="Enter your email"
              value={schoolData.email}
              onChangeInput={(event) => handleChangeData(event)}
              error={errors?.email}
              onClickInput={() => handleClickInput("email")}
            />
            <div className="relative">
              <CustomTextField
                label="Password*"
                fieldName="password"
                placeholder="Enter your password"
                value={schoolData.password}
                type={isShowPassword ? "text" : "password"}
                onChangeInput={(event) => handleChangeData(event)}
                error={errors?.password}
                onClickInput={() => handleClickInput("password")}
              />
              <div
                className="absolute right-3 top-9 cursor-pointer p-1"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {renderOnConditionBase(
                  isShowPassword,
                  <FaEye className="opacity-25" />,
                  <FaEyeSlash className="opacity-25" />
                )}
              </div>
            </div>
            <div className="relative">
              <CustomTextField
                label="Confirm Password*"
                fieldName="confirm_password"
                placeholder="Enter Confirm password"
                value={schoolData.confirm_password}
                type={isShowConfirmPassword ? "text" : "password"}
                onChangeInput={(event) => handleChangeData(event)}
                error={errors?.confirm_password}
                onClickInput={() => handleClickInput("confirm_password")}
              />
              <div
                className="absolute right-3 top-9 cursor-pointer p-1"
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              >
                {renderOnConditionBase(
                  isShowConfirmPassword,
                  <FaEye className="opacity-25" />,
                  <FaEyeSlash className="opacity-25" />
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 p-4">
          <Button
            size="lg"
            className="w-full"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? <CircularProgress /> : "Sign Up"}
          </Button>
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link href="/login" className="text-blue-600 underline ml-1">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignPage;
