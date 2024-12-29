"use client";
import React, { useState } from "react";
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
import CircularProgress from "@/components/customComponents/CircularProgress";

const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const { email, password } = loginData;
    if (email.length > 0 && password.length > 0) {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", loginData);
        toast.success(response.data.message);
        router.push("/dashboard");
      } catch (error: any) {
        if (error.response?.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Login</h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleChangeData}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChangeData}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            className="w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress /> : "Login"}
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
