"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    schoolName: "",
    email: "",
  });

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleFetchUserData = async () => {
    const apicall = await fetch("/api/users/currentUser", {
      method: "GET",
    });
    const response = await apicall.json();
    setUserData(response.user);
  };

  useEffect(() => {
    handleFetchUserData();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <p className="text-3xl">Dashboard</p>
      <div className="bg-blue-400 border border-blue-700 px-4 py-2 rounded-lg my-3">
        <p>{userData.schoolName}</p>
        <p>{userData.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="w-full py-3 bg-blue-500 mt-4 rounded-lg text-white hover:bg-blue-600 max-w-24"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
