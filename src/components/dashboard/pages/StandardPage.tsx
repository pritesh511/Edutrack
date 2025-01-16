"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import AddStandardDialog from "../dialogs/AddStandardDialog";
import { renderOnConditionBase } from "@/helpers/helper";
import Loader from "@/components/common/Loader";
import NoDataFound from "@/components/common/NoDataFound";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  useDeleteStandardMutation,
  useGetStandardQuery,
} from "@/redux/query/standard";
import toast from "react-hot-toast";
import { Standard } from "@/utils/types";
import { Card, CardContent } from "@/components/ui/card";

export default function ClassesTabView() {
  const [openModal, setOpenModal] = useState(false);
  const [isEditStandard, setIsEditStandard] = useState<Standard | null>(null);
  const { data, isLoading } = useGetStandardQuery("");
  const [deleteStandard] = useDeleteStandardMutation();

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setIsEditStandard(null);
  }, []);

  const handleClickStandard = async (id: string) => {
    try {
      const { data } = await deleteStandard(id);
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Standards</h1>
          <Button onClick={() => setOpenModal(true)} size={"lg"}>
            Add Standard
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {renderOnConditionBase(
            isLoading,
            <Loader />,
            <>
              {renderOnConditionBase(
                data?.standards.length == 0,
                <NoDataFound />,
                <>
                  {data?.standards.map((std) => (
                    <div
                      key={std._id}
                      className="p-4 border rounded-lg shadow-sm transition duration-300 flex flex-row items-center justify-between"
                    >
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {std.standard}
                        </h2>
                        <p className="text-gray-600 text-sm">
                          {std.description}
                        </p>
                      </div>
                      <div className="flex flex-row gap-2">
                        <Button
                          onClick={() => {
                            setIsEditStandard(std);
                            setOpenModal(true);
                          }}
                          size={"icon"}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          size={"icon"}
                          onClick={() => handleClickStandard(std._id)}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>

        <AddStandardDialog
          closeModal={handleCloseModal}
          isModalOpen={openModal}
          isEditStandard={isEditStandard}
        />
      </CardContent>
    </Card>
  );
}
