"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomTableHead from "@/components/custom/CustomTableHead";
import CustomTableRow from "@/components/custom/CustomTableRow";
import CustomTableCell from "@/components/custom/CustomTableCell";
import CustomTable from "@/components/custom/CustomTable";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import {
  useDeleteStudentMutation,
  useEditStudentMutation,
  useLazyGetStudentsQuery,
  usePostStudentMutation,
} from "@/redux/query/student";
import { renderOnConditionBase } from "@/helpers/helper";
import Loader from "@/components/common/Loader";
import { Student } from "@/utils/types";
import { IoEye } from "react-icons/io5";
import CustomSelect from "@/components/custom/CustomSelect";
import { useLazyGetStandardDropdownQuery } from "@/redux/query/standard";
import FormDialog from "@/components/common/form/FormDialog";
import { useFormOperations } from "@/helpers/hooks/useFormOperations";
import {
  studentFormconfig,
  studentIntialvalue,
} from "@/utils/mocks/student.mock";
import { useGetTeacherDropdownQuery } from "@/redux/query/teacher";
import { useDeleteEntity } from "@/helpers/hooks/useDeleteEntity";

const StudentTabView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditStudent, setIsEditStudent] = useState<null | Student>(null);
  const [isViewStudent, setIsViewStudent] = useState<boolean>(false);
  const [trigger, { data, isLoading, isFetching }] = useLazyGetStudentsQuery();
  const [selectedStd, setSelectedStd] = useState("");
  const [fetchStandardDropdownData, { data: standardDrodownData }] =
    useLazyGetStandardDropdownQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [postStudent] = usePostStudentMutation();
  const [editStudent] = useEditStudentMutation();
  const { data: teacherDrodownData } = useGetTeacherDropdownQuery("");

  const { formValues, handleSubmit, isSubmitting } = useFormOperations({
    postMutation: (values) => postStudent(values).unwrap(),
    editMutation: (id, values) => editStudent({ id, form: values }).unwrap(),
    entityName: "Standard",
    initialValues: studentIntialvalue,
    onSuccessCall: () => {
      setIsModalOpen(false);
    },
    editData: isEditStudent
      ? {
          id: isEditStudent._id,
          values: isEditStudent,
        }
      : undefined,
  });

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
    if (standardDrodownData?.data.standards) {
      trigger({
        standard: standardDrodownData?.data.standards[0]?.value,
      });
      setSelectedStd(standardDrodownData?.data.standards[0]?.value);
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

  const { handleDelete } = useDeleteEntity({
    entityName: "Student",
    successMessage: "Student deleted successfully!",
    errorMessage: "Could not delete Student",
  });

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
              data?.data.students.length == 0,
              <CustomTableRow>
                <CustomTableCell
                  colSpan={7}
                  cellName={"No Data Found"}
                  className="text-center text-lg font-semibold"
                />
              </CustomTableRow>,
              <>
                {data?.data.students.map((student) => {
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
                              onClick={() =>
                                handleDelete(student._id, deleteStudent)
                              }
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
                options={standardDrodownData?.data.standards || []}
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
      <FormDialog
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditStudent ? "Edit Student" : "Add Student"}
        formConfig={studentFormconfig(
          standardDrodownData?.data.standards || [],
          teacherDrodownData?.data.teachers || []
        )}
        initialValues={formValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isViewMode={isViewStudent}
        className="md:max-w-lg lg:max-w-4xl student-dialog"
      />
    </>
  );
};

export default StudentTabView;
