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

const StudentTabView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>001</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Class X-A</TableCell>
                <TableCell>95%</TableCell>
                <TableCell>
                  <Button variant="ghost" className="text-blue-600">
                    Edit
                  </Button>
                  <Button variant="ghost" className="text-red-600">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
