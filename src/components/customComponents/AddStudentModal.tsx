"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
}

const AddStudentModal = (props: Props) => {
  const { setIsModalOpen, isModalOpen } = props;
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input placeholder="Student Name" />
          <Input placeholder="Class" />
          <Input type="email" placeholder="Parent Email" />
          <Input type="tel" placeholder="Parent Phone" />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;
