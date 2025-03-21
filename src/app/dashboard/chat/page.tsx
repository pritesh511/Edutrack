"use client";
import React, { useCallback, useState } from "react";
const AddChatGroupDialog = React.lazy(
  () => import("@/components/dashboard/dialogs/AddChatGroupDialog")
);
import {
  useDeleteGroupMutation,
  useGetGroupsQuery,
} from "@/redux/query/chatgroup";
import { renderOnConditionBase } from "@/helpers/helper";
import Loader from "@/components/common/common/Loader";
import NoDataFound from "@/components/common/common/NoDataFound";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { ChatGroup, Teacher } from "@/utils/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AvatarGroup from "@/components/common/common/AvatarGroup";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getUserData } from "@/redux/slices/userSlice";

const ChatPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditGroup, setIsEditGroup] = useState<ChatGroup | null>(null);
  const { currentUser } = useSelector(getUserData);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    setIsEditGroup(null);
  }, []);

  const { data, isLoading } = useGetGroupsQuery("");
  const [deleteGroup] = useDeleteGroupMutation();

  const getAvtarprops = (users: Array<Teacher>) => {
    const avtarprops = users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        image: "https://github.com/shssadcn.png",
      };
    });
    return avtarprops;
  };

  const handleDeleteGroup = async (id: string) => {
    try {
      const { data, error } = await deleteGroup(id);
      if (error) {
        toast.error((error as any)?.data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Groups</h1>
          {renderOnConditionBase(
            currentUser?.role === "admin",
            <Button onClick={() => setIsOpen(true)} size={"lg"}>
              Add Group
            </Button>,
            <></>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {renderOnConditionBase(
            isLoading,
            <Loader />,
            <>
              {renderOnConditionBase(
                data?.groups.length == 0,
                <NoDataFound />,
                <>
                  {data?.groups.map((group) => (
                    <Link
                      href={`/dashboard/chat/${group._id}`}
                      key={group._id}
                      className="p-4 border rounded-lg shadow-sm transition duration-300 flex flex-row items-center justify-between hover:shadow-md"
                    >
                      <div>
                        <h2 className="font-semibold text-gray-800">
                          {group.groupName}
                        </h2>
                        <div className="mt-4">
                          <AvatarGroup users={getAvtarprops(group.members)} />
                        </div>
                      </div>
                      {renderOnConditionBase(
                        currentUser?.role === "admin",
                        <div className="flex flex-row gap-2">
                          <Button
                            size={"icon"}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsEditGroup(group);
                              setIsOpen(true);
                            }}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size={"icon"}
                            variant="destructive"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteGroup(group._id);
                            }}
                          >
                            <MdDelete />
                          </Button>
                        </div>,
                        <></>
                      )}
                    </Link>
                  ))}
                </>
              )}
            </>
          )}
        </div>

        <AddChatGroupDialog
          isOpen={isOpen}
          closeModal={handleCloseModal}
          isEditGroup={isEditGroup}
        />
      </CardContent>
    </Card>
  );
};

export default ChatPage;
