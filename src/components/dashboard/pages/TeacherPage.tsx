"use client";
import Loader from "@/components/common/Loader";
import NoDataFound from "@/components/common/NoDataFound";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLabelOfSubject, renderOnConditionBase } from "@/helpers/helper";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React, { useCallback, useState } from "react";
import AddTeacherDialog from "../dialogs/AddTeacherDialog";
import {
  useDeleteTeacherMutation,
  useGetTeachersQuery,
} from "@/redux/query/teacher";
import toast from "react-hot-toast";
import { Teacher } from "@/utils/types";

const TeacherTabView = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isEditTeacher, setIsEditTeacher] = useState<null | Teacher>(null);
  const { data, isLoading } = useGetTeachersQuery("");
  const [deleteTeacher] = useDeleteTeacherMutation();

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleDeleteTeacher = async (id: string) => {
    try {
      const { data, error } = await deleteTeacher(id);
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
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Teachers</h1>
          <Button size="lg" onClick={() => setOpenModal(true)}>
            Add Teacher
          </Button>
        </div>

        <div>
          {renderOnConditionBase(
            isLoading,
            <Loader />,
            <>
              {renderOnConditionBase(
                data?.teachers.length === 0,
                <NoDataFound />,
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data?.teachers.map((teacher) => (
                    <Card key={teacher._id} className="shadow-md rounded-lg">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex flex-col items-center">
                          <Avatar className="h-[100px] w-[100px] rounded-full">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt={teacher.name}
                            />
                            <AvatarFallback>
                              {teacher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <h4 className="mt-4 text-lg font-semibold text-gray-800">
                            {teacher.name}
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-row gap-1 items-center">
                            <p className="font-medium text-gray-600 text-sm">
                              Total Year of Experience:
                            </p>
                            <p className="text-gray-800 text-sm font-semibold">
                              {teacher.experience} Year
                            </p>
                          </div>
                          <div className="flex flex-row gap-1 items-center">
                            <p className="font-medium text-gray-600 text-sm">
                              Email:
                            </p>
                            <p className="text-gray-800 text-sm font-semibold">
                              {teacher.email}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-600 text-sm">
                              Graduation:
                            </h5>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {teacher.educations.map((education) => (
                                <Badge key={education} variant="outline">
                                  {getLabelOfSubject(education)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-600 text-sm">
                              Subjects:
                            </h5>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {teacher.subjects.map((subject) => (
                                <Badge key={subject._id} variant="outline">
                                  {subject.subjectName}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-600 text-sm">
                              Standards:
                            </h5>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {teacher.standards.map((std) => (
                                <Badge key={std._id} variant="outline">
                                  {std.standard}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center gap-3">
                          <Button
                            size="icon"
                            onClick={() => {
                              setIsEditTeacher(teacher);
                              setOpenModal(true);
                            }}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleDeleteTeacher(teacher._id)}
                          >
                            <MdDelete />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
      <AddTeacherDialog
        open={openModal}
        onClose={handleCloseModal}
        isEditTeacher={isEditTeacher}
      />
    </Card>
  );
};

export default TeacherTabView;
