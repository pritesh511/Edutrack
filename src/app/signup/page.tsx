"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CircularProgress from "@/components/common/CircularProgress";
import CustomTextField from "@/components/common/CustomTextField";
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import { signupSchema } from "@/utils/schema";

const SignPage = () => {
  const router = useRouter();
  const [schoolData, setSchoolData] = useState({
    schoolName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSchoolData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <CustomTextField
              label="School Name*"
              fieldName="schoolName"
              placeholder="Enter your email"
              value={schoolData.schoolName}
              onChangeInput={(event) => handleChangeData(event)}
              error={errors?.schoolName}
            />
            <CustomTextField
              label="Email*"
              fieldName="email"
              placeholder="Enter your email"
              value={schoolData.email}
              onChangeInput={(event) => handleChangeData(event)}
              error={errors?.email}
            />
            <CustomTextField
              label="Password*"
              fieldName="password"
              placeholder="Enter your password"
              value={schoolData.password}
              onChangeInput={(event) => handleChangeData(event)}
              error={errors?.password}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
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
