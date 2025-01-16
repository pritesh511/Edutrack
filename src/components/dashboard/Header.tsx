"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BsList } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  getUserData,
  logoutUser,
} from "@/redux/slices/userSlice";
import { renderOnConditionBase } from "@/helpers/helper";

interface Props {
  setIsSidebarOpen: (value: boolean) => void;
  isSidebarOpen: boolean;
}

const Header = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser, isUserDataLoading } = useSelector(getUserData);
  const { setIsSidebarOpen, isSidebarOpen } = props;

  const handleLogout = async () => {
    try {
      dispatch(logoutUser() as any).then(
        (resp: { payload: { message: string } }) => {
          toast.success(resp.payload.message);
          router.push("/login");
        }
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      dispatch(getCurrentUser() as any);
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
              {renderOnConditionBase(
                isUserDataLoading,
                <p>loading</p>,
                <>
                  {currentUser && (
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="uppercase bg-blue-500 text-white">
                          {currentUser.schoolName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-700">
                        {currentUser.schoolName}
                      </span>
                    </div>
                  )}
                </>
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
