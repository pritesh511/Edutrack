import React from "react";
import { Button } from "@/components/ui/button";
import { BsList } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  setIsSidebarOpen: (value: boolean) => void;
  isSidebarOpen: boolean;
}

const Header = (props: Props) => {
  const router = useRouter();
  const { setIsSidebarOpen, isSidebarOpen } = props;

  const handleLogout = async () => {
    try {
      const logoutCall = await fetch("/api/users/logout", {
        method: "GET",
      });
      const response = await logoutCall.json();
      toast.success(response.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
              <Button variant="ghost" className="flex items-center space-x-2">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700">Admin</span>
              </Button>
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
