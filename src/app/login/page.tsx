"use client";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChangeData = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = loginData;
    if (email.length > 0 && password.length > 0) {
      try {
        const response = await axios.post("/api/users/login", loginData);
        toast.success(response.data.message);
        router.push("/dashboard");
      } catch (error: any) {
        console.log(error);
        if (error.status === 400) {
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error("Please fill required data");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4 font-bold">Login</h1>
      <hr />
      <div className="max-w-[500px] w-full p-4 border shadow-lg shadow-zinc-200 rounded-lg">
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="email">Email:</label>
          <input
            className="border shadow-md focus:outline-none focus:border-blue-700 shadow-zinc-200 py-2 px-3 rounded-lg"
            placeholder="Please enter school email"
            name="email"
            value={loginData.email}
            onChange={(event) => handleChangeData(event)}
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="password">Password:</label>
          <input
            className="border shadow-md focus:outline-none focus:border-blue-700 shadow-zinc-200 py-2 px-3 rounded-lg"
            placeholder="Please enter password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={(event) => handleChangeData(event)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-500 mt-4 rounded-lg text-white hover:bg-blue-600"
        >
          Login
        </button>
      </div>
      <div className="mt-3">
        <p>
          Please signup if you not register
          <Link href="/signup" className="ml-2 text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
