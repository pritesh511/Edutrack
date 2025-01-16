"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BsList } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch } from "react-redux";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { setCurrentUser, setEmptyCurrentUser } from "@/redux/slices/userSlice";

interface Props {
  setIsSidebarOpen: (value: boolean) => void;
  isSidebarOpen: boolean;
}

const Header = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const { setIsSidebarOpen, isSidebarOpen } = props;

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/api/users/logout");
      toast.success(response.data.message);
      dispatch(setEmptyCurrentUser());
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/api/users/currentUser");
      setCurrentUserName(response.data.user.schoolName);
      dispatch(setCurrentUser(response.data.user));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentUserName) {
      getCurrentUser();
    }
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <BsList />
        </Button>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {currentUserName && (
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="uppercase bg-blue-500 text-white">
                      {currentUserName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-700">{currentUserName}</span>
                </div>
              )}
            </div>
          </div>
          <IoMdLogOut
            onClick={() => handleLogout()}
            style={{ width: 32, height: 32, cursor: "pointer" }}
            color="rgb(37, 99, 235)"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
