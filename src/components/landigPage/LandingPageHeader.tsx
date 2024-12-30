"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaSchool } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const LandingPageHeader = () => {
  const [currentUser, setCurrentUser] = useState("");

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/users/currentUser");
      setCurrentUser(response.data.user.schoolName);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  });

  return (
    <header className="bg-blue-700 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center space-x-4">
          <FaSchool className="text-3xl" />
          <h1 className="text-2xl font-bold">EduTrack</h1>
        </div>
        <nav className="flex items-center space-x-4">
          <a href="#about" className="hover:underline">
            About Us
          </a>
          <a href="#services" className="hover:underline">
            Services
          </a>
          <a href="#contact" className="hover:underline">
            Contact Us
          </a>
          <div className="flex space-x-2">
            {currentUser ? (
              <>
                <Link href="/dashboard">
                  <Button variant={"secondary"}>Dashboard</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant={"secondary"}>Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant={"secondary"}>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default LandingPageHeader;
