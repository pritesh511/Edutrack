"use client";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
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
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import CustomTextField from "@/components/common/CustomTextField";
import { loginSchema } from "@/utils/schema";

const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isPending, setTransition] = useTransition();
  const [errors, setErrors] = useState<any>({});

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleLogin = async () => {
    setTransition(async () => {
      try {
        await loginSchema.validate(loginData, { abortEarly: false });

        const response = await axios.post("/api/users/login", loginData);
        toast.success(response.data.message);
        router.push("/dashboard");
      } catch (validationsErrors: any) {
        if (validationsErrors.response?.data.message) {
          toast.error(validationsErrors.response.data.message);
        } else {
          const errors = transformYupErrorsIntoObject(validationsErrors);
          setErrors(errors);
        }
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Login</h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <CustomTextField
              label="Email*"
              fieldName="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChangeInput={(event) => handleChangeData(event)}
              error={errors?.email}
            />
            <CustomTextField
              label="Password*"
              fieldName="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChangeInput={(event) => handleChangeData(event)}
              error={errors?.password}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            className="w-full"
            onClick={handleLogin}
            disabled={isPending}
          >
            {isPending ? <CircularProgress /> : "Login"}
          </Button>
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?
            <Link href="/signup" className="text-blue-600 underline ml-1">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
