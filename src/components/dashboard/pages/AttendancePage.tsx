"use client";
import CustomSelect from "@/components/common/CustomSelect";
import CustomTable from "@/components/common/CustomTable";
import CustomTableCell from "@/components/common/CustomTableCell";
import CustomTableHead from "@/components/common/CustomTableHead";
import CustomTableRow from "@/components/common/CustomTableRow";
import Loader from "@/components/common/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { renderOnConditionBase } from "@/helpers/helper";
import { useLazyGetStandardDropdownQuery } from "@/redux/query/standard";
import { useLazyGetStudentsQuery } from "@/redux/query/student";
import React, { useState, useEffect } from "react";
import { ATTENDANCE_LIST } from "@/utils/constant";
import { Student } from "@/utils/types";
import moment from "moment";
import { Button } from "@/components/ui/button";

const AttendancePage = () => {
  const [selectedStd, setSelectedStd] = useState("");
  const [trigger, { data, isLoading, isFetching }] = useLazyGetStudentsQuery();
  const [copyStudentData, setCopyStudentData] = useState<Student[] | null>(
    null
  );
  const [fetchStandardDropdownData, { data: standardDrodownData }] =
    useLazyGetStandardDropdownQuery();

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

  useEffect(() => {
    if (data) {
      const copyData = data.students.map((student) => ({
        ...student,
        attendance: student.attendance
          ? [...student.attendance, { date: new Date(), status: "present" }]
          : [],
      }));
      setCopyStudentData(copyData);
    }
  }, [data]);

  const StudentTableHeader = () => {
    const headers = [
      "Role No",
      "Name",
      "Class",
      "Father Mo",
      "Class Teacher",
      "Attendance",
    ];
    return (
      <>
        {headers.map((head) => (
          <CustomTableHead key={head} headeName={head} />
        ))}
      </>
    );
  };

  const handleChangeAttendance = (student: Student, value: string) => {
    if (!copyStudentData) return;

    const updatedCopyStudentData = copyStudentData.map((cstudent) => {
      if (cstudent._id === student._id) {
        return {
          ...cstudent,
          attendance: cstudent.attendance.map((attendance) => {
            if (
              moment(attendance.date).format("DD/MM/YYYY") ===
              moment(new Date()).format("DD/MM/YYYY")
            ) {
              return {
                ...attendance,
                status: value,
              };
            }
            return attendance;
          }),
        };
      }
      return cstudent;
    });

    setCopyStudentData(updatedCopyStudentData);
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
              copyStudentData?.length == 0,
              <CustomTableRow>
                <CustomTableCell
                  colSpan={7}
                  cellName={"No Data Found"}
                  className="text-center text-lg font-semibold"
                />
              </CustomTableRow>,
              <>
                {copyStudentData?.map((student) => {
                  const attendance = student.attendance.find(
                    (cstudent) =>
                      moment(cstudent.date).format("DD/MM/YYYY") ==
                      moment(new Date()).format("DD/MM/YYYY")
                  );
                  return (
                    <CustomTableRow key={student.roleNo}>
                      <CustomTableCell width={"5%"} cellName={student.roleNo} />
                      <CustomTableCell width={"10%"} cellName={student.name} />
                      <CustomTableCell
                        width={"8%"}
                        cellName={student.standard.standard}
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
                        cellName={
                          <CustomSelect
                            placeholder={"Attendance"}
                            options={ATTENDANCE_LIST || []}
                            value={attendance?.status || "present"}
                            className="h-10 w-[124px] bg-white"
                            handleChangeSelect={(value) => {
                              handleChangeAttendance(student, value);
                            }}
                          />
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

  const handleSubmitAttendance = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Attendance</h2>
            <div className="flex gap-2">
              <CustomSelect
                placeholder={"Select Teacher"}
                options={standardDrodownData?.standards || []}
                value={selectedStd}
                className="h-10 w-[124px]"
                handleChangeSelect={(value) => {
                  setSelectedStd(value);
                  trigger({
                    standard: value,
                  });
                }}
              />
            </div>
          </div>
          <CustomTable
            tableHeader={<StudentTableHeader />}
            tableBody={<StudentTableBody />}
          />
          <div
            className="pt-4 text-end"
            onClick={() => handleSubmitAttendance()}
          >
            <Button>Submit Attendance</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AttendancePage;
