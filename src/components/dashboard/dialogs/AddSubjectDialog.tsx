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
  closeModal: () => void;
  isModalOpen: boolean;
}

const AddSubjectDialog = (props: Props) => {
  const { closeModal, isModalOpen } = props;
  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Subject Name" />
          <textarea
            id="description"
            rows={3}
            name="description"
            placeholder="Write your comment for subject here..."
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Input id="picture" type="file" />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubjectDialog;
