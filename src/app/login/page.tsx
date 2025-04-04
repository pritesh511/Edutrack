"use client";
import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CircularProgress from "@/components/common/CircularProgress";
import {
  renderOnConditionBase,
  transformYupErrorsIntoObject,
} from "@/helpers/helper";
import CustomTextField from "@/components/custom/CustomTextField";
import { loginSchema } from "@/utils/schema";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/redux/slices/userSlice";
import CustomSelect from "@/components/custom/CustomSelect";
import { USER_TYPES } from "@/utils/constant";
import { io, Socket } from "socket.io-client";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import fetch from "@/helpers/axios/axiosInstance";

let socket: Socket;

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    schoolEmail: "",
    role: "admin",
  });
  const [isPending, setTransition] = useTransition();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectRole = (name: string, value: string) => {
    setLoginData((prev) => ({
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

  useEffect(() => {
    socket = io("/", { path: "/api/socket" });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogin = async () => {
    setTransition(async () => {
      try {
        await loginSchema.validate(loginData, { abortEarly: false });

        const response = await fetch.post("/api/users/login", loginData);
        console.log(response);
        toast.success(response.data.message);
        dispatch(setCurrentUser(response.data.user));
        if (response.data.user.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/dashboard/student");
        }
        socket.emit("send-notification", {
          message: `${response.data.user.schoolName} is login now.`,
        });
      } catch (validationsErrors: any) {
        console.log(validationsErrors.message.message);
        if (validationsErrors.message.message) {
          toast.error(validationsErrors.message.message);
        } else {
          const errors = transformYupErrorsIntoObject(validationsErrors);
          setErrors(errors);
        }
      }
    });
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      <div className="md:block hidden w-full h-full">
        <Image
          src={"/assets/authImage.jpg"}
          alt="auth-image"
          className="h-screen w-full"
          objectFit="cover"
          width={400}
          height={400}
        />
      </div>
      <div className="flex items-center justify-center py-8 px-4 overflow-auto">
        <Card className="w-full max-w-md p-4 shadow-lg">
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">Login</h1>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              <CustomSelect
                label="Role"
                placeholder={"Select Teacher"}
                options={USER_TYPES}
                value={loginData.role}
                handleChangeSelect={(value) => handleSelectRole("role", value)}
              />
              {renderOnConditionBase(
                loginData.role === "teacher",
                <CustomTextField
                  label="School Email*"
                  fieldName="schoolEmail"
                  placeholder="Enter school email"
                  value={loginData.schoolEmail}
                  onChangeInput={(event) => handleChangeData(event)}
                  error={errors?.schoolEmail}
                  onClickInput={() => handleClickInput("schoolEmail")}
                />,
                <></>
              )}
              <CustomTextField
                label="Email*"
                fieldName="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChangeInput={(event) => handleChangeData(event)}
                error={errors?.email}
                onClickInput={() => handleClickInput("email")}
              />
              <div className="relative">
                <CustomTextField
                  label="Password*"
                  fieldName="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChangeInput={(event) => handleChangeData(event)}
                  error={errors?.password}
                  type={isShowPassword ? "text" : "password"}
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
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4 p-4">
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
                Signup
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
