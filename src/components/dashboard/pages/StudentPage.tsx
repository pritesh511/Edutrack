"use client";
import React, { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddStudentModal from "../dialogs/AddStudentDialog";
import CustomTableHead from "@/components/common/CustomTableHead";
import CustomTableRow from "@/components/common/CustomTableRow";
import CustomTableCell from "@/components/common/CustomTableCell";
import CustomTable from "@/components/common/CustomTable";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from "@/redux/query/student";
import { renderOnConditionBase } from "@/helpers/helper";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
import { Student } from "@/utils/types";
import { IoEye } from "react-icons/io5";

const StudentTabView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditStudent, setIsEditStudent] = useState<null | Student>(null);
  const { data, isLoading } = useGetStudentsQuery("");
  const [deleteStudent] = useDeleteStudentMutation();

  const StudentTableHeader = () => {
    const headers = [
      "Role No",
      "Name",
      "Class",
      "Parent's Mobile",
      "Address",
      "Actions",
    ];
    return (
      <>
        {headers.map((head) => (
          <CustomTableHead key={head} headeName={head} />
        ))}
      </>
    );
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDeleteStudent = async (id: string) => {
    try {
      const { data, error } = await deleteStudent(id);
      if (error) {
        toast.error((error as any)?.data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const StudentTableBody = () => {
    return (
      <>
        {renderOnConditionBase(
          isLoading,
          <CustomTableRow>
            <CustomTableCell
              colSpan={6}
              cellName={<Loader />}
              className="text-center text-lg font-semibold"
            />
          </CustomTableRow>,
          <>
            {renderOnConditionBase(
              data?.students.length == 0,
              <CustomTableRow>
                <CustomTableCell
                  colSpan={6}
                  cellName={"No Data Found"}
                  className="text-center text-lg font-semibold"
                />
              </CustomTableRow>,
              <>
                {data?.students.map((student) => {
                  return (
                    <CustomTableRow key={student.roleNo}>
                      <CustomTableCell width={"5%"} cellName={student.roleNo} />
                      <CustomTableCell width={"10%"} cellName={student.name} />
                      <CustomTableCell
                        width={"10%"}
                        cellName={student.standard.standard}
                      />
                      <CustomTableCell
                        width={"15%"}
                        cellName={student.mobileNo}
                      />
                      <CustomTableCell
                        width={"15%"}
                        cellName={student.address}
                      />
                      <CustomTableCell
                        width={"10%"}
                        cellName={
                          <div className="flex gap-3">
                            <Button
                              size="icon"
                              onClick={() => {
                                setIsEditStudent(student);
                                setIsModalOpen(true);
                              }}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => handleDeleteStudent(student._id)}
                            >
                              <MdDelete />
                            </Button>
                            <Button size="icon">
                              <IoEye />
                            </Button>
                          </div>
                        }
                      />
                    </CustomTableRow>
                  );
                })}
              </>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Students</h2>
            <Button onClick={() => setIsModalOpen(true)} size={"lg"}>
              Add Student
            </Button>
          </div>
          <CustomTable
            tableHeader={<StudentTableHeader />}
            tableBody={<StudentTableBody />}
          />
        </CardContent>
      </Card>
      <AddStudentModal
        closeModal={() => handleCloseModal()}
        isModalOpen={isModalOpen}
        isEditStudent={isEditStudent}
      />
    </>
  );
};

export default StudentTabView;
