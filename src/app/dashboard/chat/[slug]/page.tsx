"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter, useParams } from "next/navigation";
import { useLazyGetGroupsDetailsQuery } from "@/redux/query/chatgroup";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const [fetchGroupDetails, { data, isFetching }] =
    useLazyGetGroupsDetailsQuery();

  useEffect(() => {
    if (typeof slug === "string") {
      fetchGroupDetails(slug);
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row items-center justify-between py-4 px-4 bg-primary">
        <div className="flex flex-row items-center gap-3">
          <Button variant={"secondary"} size={"icon"} onClick={router.back}>
            <IoMdArrowBack />
          </Button>
          <p className="text-white">{data?.group.groupName}</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">View all members</Button>
          </PopoverTrigger>
          <PopoverContent className="w-50 px-2 py-2" align="end">
            <div>
              {data?.group.members.map((member) => {
                return (
                  <div
                    key={member._id}
                    className="flex items-center gap-2 hover:bg-secondary px-2 py-1 rounded-md cursor-pointer"
                  >
                    <Avatar className="w-10 h-10 border-2 border-white">
                      <AvatarImage src={"abcd"} alt={member.name} />
                      <AvatarFallback className="text-sm">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm">{member.name}</p>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex-1 bg-secondary"></div>
    </div>
  );
};

export default ChatDetailPage;
