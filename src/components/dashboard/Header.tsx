"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BsList } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/helpers/axios/axiosInstance";
import {
  getUserData,
  setCurrentUser,
  setEmptyCurrentUser,
} from "@/redux/slices/userSlice";
import { toggleSidebar } from "@/redux/slices/dashboardSlice";
import { IoNotifications } from "react-icons/io5";
import { io, Socket } from "socket.io-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

let socket: Socket;

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(getUserData);
  const [currentUserName, setCurrentUserName] = useState<string>("");

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

    socket = io("/", { path: "/api/socket" });

    socket.on("get-notification", (data: string) => {
      toast.success(data, { position: "top-right" });
    });

    return () => {
      socket.off("get-notification");
      socket.off("send-notification");
      socket.disconnect();
    };
  }, []);

  const handleChangeRoute = (route: string) => {
    router.push(route);
  };

  const DropdownMenuDemo = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {currentUser && (
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback className="uppercase bg-blue-500 text-white">
                  {currentUser.schoolName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => handleChangeRoute("/dashboard/profile")}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLogout()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between p-6">
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        >
          <BsList />
        </Button>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <h4 className="text-2xl">
              {currentUser ? currentUser.schoolName : ""}
            </h4>
          </div>
          <div className="flex items-center gap-4">
            <IoNotifications
              style={{ width: 24, height: 24, cursor: "pointer" }}
              color="rgb(37, 99, 235)"
            />
            <DropdownMenuDemo />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
