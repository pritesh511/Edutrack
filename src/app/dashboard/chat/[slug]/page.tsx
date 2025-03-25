"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState, use, useMemo } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useLazyGetGroupsDetailsQuery } from "@/redux/query/chatgroup";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { io, Socket } from "socket.io-client";
import CustomTextField from "@/components/custom/CustomTextField";
import { useSelector } from "react-redux";
import { getUserData } from "@/redux/slices/userSlice";
import { IoSend } from "react-icons/io5";
import moment from "moment";

let socket: Socket;

interface Message {
  groupId: string;
  avatar: string;
  name: string;
  message: string;
  time: Date;
}

const ChatDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const router = useRouter();
  const paramsSlug = use(params);
  const slug = paramsSlug.slug;
  const [fetchGroupDetails, { data }] = useLazyGetGroupsDetailsQuery();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [joinedGroupList, setJoinedGroupList] = useState<string[]>([]);
  const messageBoxRef = useRef<HTMLDivElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const { currentUser } = useSelector(getUserData);

  const username = useMemo(
    () =>
      currentUser?.role === "teacher"
        ? currentUser?.teacherName
        : currentUser?.schoolName,
    [currentUser]
  );

  useEffect(() => {
    socket = io("https://edutrack-pritesh511s-projects.vercel.app", {
      path: "/api/socket",
    });
    console.log("socket::", socket);

    if (typeof slug === "string") {
      fetchGroupDetails(slug);

      const joinGroup = {
        groupId: slug,
        joinUserId: currentUser?.teacherId,
      };

      socket.emit("join-group", joinGroup);

      socket.on("joined-group", (id: string) => {
        setJoinedGroupList((prevState) => [...prevState, id]);
      });

      socket.on("receive-message", (data: Message) => {
        setMessageList((pastmsgs) => [...pastmsgs, data]);
      });
    }

    return () => {
      socket.off("joined-group");
      socket.off("join-group");
      socket.off("receive-message");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }

    document.addEventListener("keydown", handleSubmitForm);

    return () => {
      document.removeEventListener("keydown", handleSubmitForm);
    };
  }, [messageList]);

  const handleSubmitForm = (event: any) => {
    if (event.key == "Enter") {
      submitBtnRef.current?.click();
    }
  };

  const handleSendMessage = (event: any) => {
    event.preventDefault();
    const user = {
      username: username,
      avatar: "/path/to/john-avatar.png",
    };

    const newMessage = {
      groupId: slug,
      avatar: user.avatar,
      name: user.username,
      message,
      time: new Date(),
    };

    if (message.trim()) {
      socket.emit("send-message", newMessage);
      setMessage("");
    }
  };

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
                    <div>
                      <p className="text-sm">{member.name}</p>
                      <p
                        className={`text-[12px] ${
                          joinedGroupList.includes(member._id)
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {joinedGroupList.includes(member._id)
                          ? "online"
                          : "offline"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex-1 flex flex-col bg-secondary overflow-auto">
        <div
          ref={messageBoxRef}
          className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100"
        >
          {messageList.map((message, index) => (
            <div className="flex flex-col" key={index}>
              <p
                className={`text-[10px] ml-[53px] mb-1 mr-2 text-gray-600 ${
                  message.name === username ? "text-end" : "text-start"
                }`}
              >
                {message.name === username ? "" : message.name}{" "}
                {moment(message.time).format("LT")}
              </p>
              <div
                key={index}
                className={`flex items-start ${
                  message.name === username ? "justify-end" : "justify-start"
                }`}
              >
                <div className="mr-3">
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarImage src={"abcd"} alt={"avtar"} />
                    <AvatarFallback className="text-sm bg-white">
                      {message.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div
                  className={`flex flex-col max-w-[70%] p-3 rounded-lg text-sm ${
                    message.name === username
                      ? "bg-green-200 text-right self-end"
                      : "bg-blue-200 text-left self-start"
                  }`}
                >
                  <div>{message.message}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="py-2 px-3 flex items-center space-x-3"
        >
          <CustomTextField
            className="w-full bg-white"
            fieldName="message"
            placeholder="Type message here"
            value={message}
            onChangeInput={(event) => setMessage(event.target.value)}
          />
          <Button className="h-12" type="submit" ref={submitBtnRef}>
            <IoSend />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetailPage;
