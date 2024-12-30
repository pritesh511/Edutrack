"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdMore } from "react-icons/io";
import AddSubjectDialog from "../dialogs/AddSubjectDialog";

const SubjectTabView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeSubjectDialog = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Subjects List</h2>
            <Button onClick={() => setIsModalOpen(true)} size={"lg"}>
              Add Subject
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {[1, 2].map((item) => {
              return (
                <Card key={item}>
                  <CardContent className="p-6 flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <Image
                        src={"/assets/subject.jpg"}
                        alt="Subject"
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="ml-4">
                        <h4 className="text-xl font-semibold">Maths</h4>
                        <p>
                          Math, or mathematics, is the study of numbers, shapes,
                          and logic.
                        </p>
                      </div>
                    </div>
                    <Popover>
                      <PopoverTrigger className="w-6 h-6">
                        <IoMdMore className="size-full" />
                      </PopoverTrigger>
                      <PopoverContent className="max-w-32 px-0">
                        <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Edit
                        </p>
                        <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Delete
                        </p>
                      </PopoverContent>
                    </Popover>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <AddSubjectDialog
        isModalOpen={isModalOpen}
        closeModal={closeSubjectDialog}
      />
    </>
  );
};

export default SubjectTabView;
