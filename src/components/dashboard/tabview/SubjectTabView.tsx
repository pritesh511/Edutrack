"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdMore } from "react-icons/io";
import AddSubjectDialog from "../dialogs/AddSubjectDialog";
import toast from "react-hot-toast";
import axios from "axios";
import { Subject } from "@/utils/types";
import CircularProgress from "@/components/common/CircularProgress";
import { renderOnConditionBase } from "@/helpers/helper";
import NoDataFound from "@/components/common/NoDataFound";
import Loader from "@/components/common/Loader";
import axiosInstance from "@/helpers/axios/axiosInstance";

const SubjectTabView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditSubject, setIsEditSubject] = useState<null | Subject>(null);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [isSubjectLoading, setIsSubjectLoading] = useState(false);
  const closeSubjectDialog = useCallback(() => {
    setIsModalOpen(false);
    setIsEditSubject(null);
  }, []);

  const getAllSubjects = useCallback(async () => {
    try {
      setIsSubjectLoading(true);
      const response = await axiosInstance.get("/api/dashboard/subject");
      setSubjectList(response.data.subjects);
      setIsSubjectLoading(false);
    } catch (error: any) {
      setIsSubjectLoading(false);
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    getAllSubjects();
  }, []);

  const handleDeleteSubject = async (id: string) => {
    try {
      const response = await axios.delete(
        `/api/dashboard/subject?subjectId=${id}`
      );
      toast.success(response.data.message);
      getAllSubjects();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
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
            {renderOnConditionBase(
              isSubjectLoading,
              <Loader />,
              <>
                {renderOnConditionBase(
                  subjectList.length === 0,
                  <NoDataFound />,
                  <>
                    {subjectList.map((subject) => {
                      return (
                        <Card key={subject._id}>
                          <CardContent className="p-6 flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center">
                              <img
                                src={subject.image}
                                alt="Subject"
                                className="rounded-lg min-w-[80px] min-h-[80px] w-[80px] h-[80px] object-cover"
                              />
                              <div className="ml-4">
                                <h4 className="text-xl font-semibold">
                                  {subject.subjectName}
                                </h4>
                                <p className="text-sm">{subject.description}</p>
                              </div>
                            </div>
                            <Popover>
                              <PopoverTrigger className="min-w-6 min-h-6">
                                <IoMdMore className="size-full" />
                              </PopoverTrigger>
                              <PopoverContent className="max-w-32 px-0">
                                <p
                                  onClick={() => {
                                    setIsEditSubject(subject);
                                    setIsModalOpen(true);
                                  }}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  Edit
                                </p>
                                <p
                                  onClick={() =>
                                    handleDeleteSubject(subject._id)
                                  }
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  Delete
                                </p>
                              </PopoverContent>
                            </Popover>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </>
                )}
              </>
            )}
            {isSubjectLoading && <CircularProgress />}
          </div>
        </CardContent>
      </Card>
      <AddSubjectDialog
        isModalOpen={isModalOpen}
        closeModal={closeSubjectDialog}
        getAllSubjects={getAllSubjects}
        isEditSubject={isEditSubject}
      />
    </>
  );
};

export default SubjectTabView;
