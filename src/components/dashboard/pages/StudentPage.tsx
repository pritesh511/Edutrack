"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const AddStudentDialog = React.lazy(
  () => import("../dialogs/AddStudentDialog")
);
import CustomTableHead from "@/components/custom/CustomTableHead";
import CustomTableRow from "@/components/custom/CustomTableRow";
import CustomTableCell from "@/components/custom/CustomTableCell";
import CustomTable from "@/components/custom/CustomTable";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import {
  useDeleteStudentMutation,
  useLazyGetStudentsQuery,
} from "@/redux/query/student";
import { renderOnConditionBase } from "@/helpers/helper";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
import { Student } from "@/utils/types";
import { IoEye } from "react-icons/io5";
import CustomSelect from "@/components/custom/CustomSelect";
import { useLazyGetStandardDropdownQuery } from "@/redux/query/standard";

const StudentTabView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditStudent, setIsEditStudent] = useState<null | Student>(null);
  const [isViewStudent, setIsViewStudent] = useState<boolean>(false);
  const [trigger, { data, isLoading, isFetching }] = useLazyGetStudentsQuery();
  const [selectedStd, setSelectedStd] = useState("");
  const [fetchStandardDropdownData, { data: standardDrodownData }] =
    useLazyGetStandardDropdownQuery();
  const [deleteStudent] = useDeleteStudentMutation();

  const StudentTableHeader = () => {
    const headers = [
      "Role No",
      "Name",
      "Class",
      "DOB",
      "Parent's Mobile",
      "Class Teacher",
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

  useEffect(() => {
    if (standardDrodownData?.standards) {
      trigger({
        standard: standardDrodownData?.standards[0]?.value,
      });
      setSelectedStd(standardDrodownData?.standards[0]?.value);
    }
  }, [standardDrodownData]);

  useEffect(() => {
    fetchStandardDropdownData("");
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setIsViewStudent(false);
    setIsEditStudent(null);
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
          isLoading || isFetching,
          <CustomTableRow>
            <CustomTableCell
              colSpan={7}
              cellName={<Loader />}
              className="text-center text-lg font-semibold"
            />
          </CustomTableRow>,
          <>
            {renderOnConditionBase(
              data?.students.length == 0,
              <CustomTableRow>
                <CustomTableCell
                  colSpan={7}
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
                        width={"8%"}
                        cellName={student.standard.standard}
                      />
                      <CustomTableCell
                        width={"8%"}
                        cellName={
                          student.dob
                            ? format(student.dob as Date, "dd/MM/yyyy")
                            : "---"
                        }
                      />
                      <CustomTableCell
                        width={"10%"}
                        cellName={student.fatherMobileNo}
                      />
                      <CustomTableCell
                        width={"10%"}
                        cellName={student.classTeacher.name}
                      />
                      <CustomTableCell
                        width={"10%"}
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
                            <Button
                              size="icon"
                              onClick={() => {
                                setIsEditStudent(student);
                                setIsViewStudent(true);
                                setIsModalOpen(true);
                              }}
                            >
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
            <div className="flex gap-2">
              <CustomSelect
                placeholder={"Select Teacher"}
                options={standardDrodownData?.standards || []}
                value={selectedStd}
                className="h-10 w-[120px]"
                handleChangeSelect={(value) => {
                  setSelectedStd(value);
                  trigger({
                    standard: value,
                  });
                }}
              />
              <Button onClick={() => setIsModalOpen(true)} size={"lg"}>
                Add Student
              </Button>
            </div>
          </div>
          <CustomTable
            tableHeader={<StudentTableHeader />}
            tableBody={<StudentTableBody />}
          />
        </CardContent>
      </Card>
      <AddStudentDialog
        closeModal={() => handleCloseModal()}
        isModalOpen={isModalOpen}
        isEditStudent={isEditStudent}
        isViewStudent={isViewStudent}
      />
    </>
  );
};

export default StudentTabView;
