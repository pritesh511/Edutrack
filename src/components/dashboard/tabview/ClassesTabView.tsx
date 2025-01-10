// pages/standards.js
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useState } from "react";
import AddStandardDialog from "../dialogs/AddStandardDialog";
import { Standard } from "@/utils/types";
import axiosInstance from "@/helpers/axios/axiosInstance";
import toast from "react-hot-toast";

export default function ClassesTabView() {
  const [openModal, setOpenModal] = useState(false);
  const [standards, setStandards] = useState<Standard[]>([]);

  const getAllStandards = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/dashboard/standard");
      setStandards(response.data.standards);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    getAllStandards();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-6">
      <div className="mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Standards</h1>
          <Button onClick={() => setOpenModal(true)}>Add Standard</Button>
        </div>

        {/* Standards List */}
        <div className="space-y-4">
          {standards.map((std) => (
            <div
              key={std._id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {std.standard}
              </h2>
              <p className="text-gray-600">{std.description}</p>
            </div>
          ))}
        </div>

        <AddStandardDialog
          closeModal={() => setOpenModal(false)}
          isModalOpen={openModal}
          getAllStandards={getAllStandards}
          isEditStandard={null}
        />
      </div>
    </div>
  );
}
