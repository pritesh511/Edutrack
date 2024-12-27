"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const SignPage = () => {
  const router = useRouter();
  const [schoolData, setSchoolData] = useState({
    schoolName: "",
    email: "",
    password: "",
  });

  const handleChangeData = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setSchoolData({
      ...schoolData,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    const { schoolName, email, password } = schoolData;
    if (schoolName.length > 0 && email.length > 0 && password.length > 0) {
      try {
        const postUser = await axios.post("/api/users/signup", schoolData);
        console.log("postUser", postUser);
        toast.success((postUser as any).data.message);
        setSchoolData({
          schoolName: "",
          email: "",
          password: "",
        });
        router.push("/login");
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      toast.error("Please fill required data");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4 font-bold">Sign Up</h1>
      <hr />
      <div className="max-w-[500px] w-full p-4 border shadow-lg shadow-zinc-200 rounded-lg">
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="schoolName">School Name:</label>
          <input
            className="border shadow-md focus:outline-none focus:border-blue-700 shadow-zinc-200 py-3 px-3 rounded-lg"
            placeholder="Please enter school name"
            name="schoolName"
            value={schoolData.schoolName}
            onChange={(event) => handleChangeData(event)}
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="email">Email:</label>
          <input
            className="border shadow-md focus:outline-none focus:border-blue-700 shadow-zinc-200 py-3 px-3 rounded-lg"
            placeholder="Please enter school email"
            name="email"
            value={schoolData.email}
            onChange={(event) => handleChangeData(event)}
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="password">Password:</label>
          <input
            className="border shadow-md focus:outline-none focus:border-blue-700 shadow-zinc-200 py-3 px-3 rounded-lg"
            placeholder="Please enter password"
            type="password"
            name="password"
            value={schoolData.password}
            onChange={(event) => handleChangeData(event)}
          />
        </div>
        <button
          onClick={() => handleSignup()}
          className="w-full py-3 bg-blue-500 mt-4 rounded-lg text-white hover:bg-blue-600"
        >
          Sign Up
        </button>
      </div>
      <div className="mt-3">
        <p>
          Please login if you already register
          <Link href="/login" className="ml-2 text-blue-500 underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignPage;
