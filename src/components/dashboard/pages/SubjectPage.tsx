"use client";
import React, { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddSubjectDialog from "../dialogs/AddSubjectDialog";
import toast from "react-hot-toast";
import { Subject } from "@/utils/types";
import { renderOnConditionBase } from "@/helpers/helper";
import NoDataFound from "@/components/common/common/NoDataFound";
import Loader from "@/components/common/common/Loader";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  useDeleteSubjectMutation,
  useGetSubjectsQuery,
} from "@/redux/query/subject";
import { ADMIN_EMAIL } from "@/utils/constant";

const SubjectTabView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditSubject, setIsEditSubject] = useState<null | Subject>(null);
  const { data: subjectData, isLoading: isSubjectLoading } =
    useGetSubjectsQuery("");
  const [deleteSubject] = useDeleteSubjectMutation();

  const closeSubjectDialog = useCallback(() => {
    setIsModalOpen(false);
    setIsEditSubject(null);
  }, []);

  const handleDeleteSubject = async (id: string) => {
    try {
      const { data, error } = await deleteSubject(id);
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
    <>
      {renderOnConditionBase(
        ADMIN_EMAIL === process.env.ADMIN_EMAIL,
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Subjects</h2>
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
                    subjectData?.subjects.length === 0,
                    <NoDataFound />,
                    <>
                      {subjectData?.subjects.map((subject) => {
                        return (
                          <Card key={subject._id}>
                            <CardContent className="p-6 flex flex-row items-center justify-between">
                              <div className="flex flex-row items-center">
                                <img
                                  src={subject.image}
                                  alt="Subject"
                                  className="rounded-lg min-w-[80px] min-h-[80px] w-[80px] h-[80px] object-cover"
                                />
                                <div className="mx-4">
                                  <h4 className="text-xl font-semibold">
                                    {subject.subjectName}
                                  </h4>
                                  <p className="text-sm">
                                    {subject.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-row gap-2">
                                <Button
                                  onClick={() => {
                                    setIsEditSubject(subject);
                                    setIsModalOpen(true);
                                  }}
                                  size={"icon"}
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  size={"icon"}
                                  onClick={() =>
                                    handleDeleteSubject(subject._id)
                                  }
                                >
                                  <MdDelete />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>,
        <Card>
          <CardContent className="p-6">
            <h1 className="text-center text-destructive">
              You don't have authorization to access this page. Please speak
              with the administrator.
            </h1>
          </CardContent>
        </Card>
      )}
      <AddSubjectDialog
        isModalOpen={isModalOpen}
        closeModal={closeSubjectDialog}
        isEditSubject={isEditSubject}
      />
    </>
  );
};

export default SubjectTabView;
