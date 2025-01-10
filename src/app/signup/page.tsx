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

const SignPage = () => {
  const router = useRouter();
  const [schoolData, setSchoolData] = useState({
    schoolName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSchoolData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    const { schoolName, email, password } = schoolData;
    if (schoolName && email && password) {
      try {
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
        toast.error(error.response?.data?.message || "Something went wrong");
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
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="schoolName">School Name</Label>
              <Input
                id="schoolName"
                name="schoolName"
                placeholder="Enter your school name"
                value={schoolData.schoolName}
                onChange={handleChangeData}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                value={schoolData.email}
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
                value={schoolData.password}
                onChange={handleChangeData}
              />
            </div>
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
