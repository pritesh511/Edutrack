"use client";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

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
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <p className="text-3xl">Dashboard</p>
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
