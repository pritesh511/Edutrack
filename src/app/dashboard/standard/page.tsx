"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  useDeleteStandardMutation,
  useEditStandardMutation,
  useGetStandardQuery,
  usePostStandardMutation,
} from "@/redux/query/standard";
import { Standard } from "@/utils/types";
import FormDialog from "@/components/common/form/FormDialog";
import {
  standardFormConfig,
  standardIntialValues,
} from "@/utils/mocks/standard.mock";
import { useFormOperations } from "@/helpers/hooks/useFormOperations";
import PageLayout from "@/components/common/PageLayout";
import { useDeleteEntity } from "@/helpers/hooks/useDeleteEntity";

export default function StandardPage() {
  const [openModal, setOpenModal] = useState(false);
  const [isEditStandard, setIsEditStandard] = useState<Standard | null>(null);
  const { data, isLoading } = useGetStandardQuery("");
  const [deleteStandard] = useDeleteStandardMutation();
  const [postStandard] = usePostStandardMutation();
  const [editStandard] = useEditStandardMutation();

  const { formValues, handleSubmit, isSubmitting } = useFormOperations({
    postMutation: (values) => postStandard(values).unwrap(),
    editMutation: (id, values) => editStandard({ id, form: values }).unwrap(),
    entityName: "Standard",
    initialValues: standardIntialValues,
    onSuccessCall: () => {
      setOpenModal(false);
    },
    editData: isEditStandard
      ? { id: isEditStandard._id, values: isEditStandard }
      : undefined,
  });

  const { handleDelete } = useDeleteEntity({
    entityName: "Standard",
    successMessage: "Standard deleted successfully!",
    errorMessage: "Could not delete standard",
  });

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setIsEditStandard(null);
  }, []);

  return (
    <>
      <PageLayout
        headerButtonText="Add Standard"
        headerTitle="Standards"
        onButtonClick={() => setOpenModal(true)}
        isDataLoading={isLoading}
        isNoData={data?.data.standards.length == 0}
      >
        {data?.data.standards.map((std) => (
          <div
            key={std._id}
            className="p-4 border rounded-lg shadow-sm transition duration-300 flex flex-row items-center justify-between"
          >
            <div className="mr-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {std.standard}
              </h2>
              <p className="text-gray-600 text-sm">{std.description}</p>
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
                onClick={() => handleDelete(std._id, deleteStandard)}
              >
                <MdDelete />
              </Button>
            </div>
          </div>
        ))}
      </PageLayout>
      <FormDialog
        isOpen={openModal}
        onClose={handleCloseModal}
        title={isEditStandard ? "Edit Standard" : "Add Standard"}
        formConfig={standardFormConfig()}
        initialValues={formValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
