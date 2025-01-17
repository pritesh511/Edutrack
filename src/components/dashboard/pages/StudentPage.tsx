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

const StudentTabView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const StudentTableBody = () => {
    const data = [
      {
        role_no: 1,
        name: "Pritesh Makasana",
        class: "Standard 1",
        parent_mo: "9081004687",
        address: "A-303, Radhika recidency, surat",
      },
      {
        role_no: 2,
        name: "Pritesh Makasana",
        class: "Standard 1",
        parent_mo: "9081004687",
        address: "A-303, Radhika recidency, surat",
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
                <CustomTableCell width={"5%"} cellName={student.role_no} />
                <CustomTableCell width={"10%"} cellName={student.name} />
                <CustomTableCell width={"10%"} cellName={student.class} />
                <CustomTableCell width={"10%"} cellName={student.parent_mo} />
                <CustomTableCell width={"15%"} cellName={student.address} />
                <CustomTableCell
                  width={"10%"}
                  cellName={
                    <div className="flex gap-3">
                      <Button size="icon">
                        <FaEdit />
                      </Button>
                      <Button size="icon" variant="destructive">
                        <MdDelete />
                      </Button>
                    </div>
                  }
                />
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
      />
    </>
  );
};

export default StudentTabView;
