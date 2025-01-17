"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddStudentModal from "../dialogs/AddStudentModal";
import CustomTableHead from "@/components/common/CustomTableHead";
import CustomTableRow from "@/components/common/CustomTableRow";
import CustomTableCell from "@/components/common/CustomTableCell";
import CustomTable from "@/components/common/CustomTable";

const StudentTabView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const StudentTableHeader = () => {
    const headers = ["Role No", "Name", "Class", "Attendance"];
    return (
      <>
        {headers.map((head) => (
          <CustomTableHead key={head} headeName={head} />
        ))}
      </>
    );
  };

  const StudentTableBody = () => {
    const data = [
      {
        role_no: 1,
        name: "Pritesh Makasana",
        class: "Standard 1",
        attendance: "78%",
      },
    ];
    return (
      <>
        {data.length == 0 ? (
          <CustomTableRow>
            <CustomTableCell
              colSpan={6}
              cellName={"No Data Found"}
              className="text-center text-lg font-semibold"
            />
          </CustomTableRow>
        ) : (
          data.map((student, index) => {
            return (
              <CustomTableRow key={student.role_no}>
                <CustomTableCell width={"5%"} cellName={index + 1} />
                <CustomTableCell width={"15%"} cellName={student.name} />
                <CustomTableCell width={"15%"} cellName={student.class} />
                <CustomTableCell width={"15%"} cellName={student.attendance} />
              </CustomTableRow>
            );
          })
        )}
      </>
    );
  };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Students List</h2>
            <Button onClick={() => setIsModalOpen(true)} size={"lg"}>
              Add Student
            </Button>
          </div>
          <CustomTable
            tableHeader={<StudentTableHeader />}
            tableTitle={""}
            tableBody={<StudentTableBody />}
          />
        </CardContent>
      </Card>
      <AddStudentModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default StudentTabView;
