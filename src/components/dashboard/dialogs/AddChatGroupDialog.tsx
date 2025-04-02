"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import CircularProgress from "@/components/common/CircularProgress";
import { chatGroupSchema } from "@/utils/schema";
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import CustomTextField from "@/components/custom/CustomTextField";
import {
  usePostGroupMutation,
  usePutChatGroupMutation,
} from "@/redux/query/chatgroup";
import { MultiSelect } from "@/components/custom/MultiSelect";
import { useGetTeacherDropdownQuery } from "@/redux/query/teacher";
import { ChatGroup } from "@/utils/types";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  isEditGroup: ChatGroup | null;
}

interface FormData {
  groupName: string;
  members: Array<string>;
}

const AddChatGroupDialog = React.memo(function AddChatGroupDialogtsx(
  props: Props
) {
  const { isOpen, closeModal, isEditGroup } = props;
  const [formData, setFormData] = useState<FormData>({
    groupName: "",
    members: [],
  });
  const [errors, setErrors] = useState<any>({});
  const [postChatGroup, { isLoading: isPostFormLoading }] =
    usePostGroupMutation();
  const [putChatGroup, { isLoading: isPutFormLoading }] =
    usePutChatGroupMutation();
  const { data: teachersDropdown } = useGetTeacherDropdownQuery("");

  const isFormLoading = isPostFormLoading || isPutFormLoading;

  const handleChangeInput = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickInput = (name: string) => {
    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCloseModal = () => {
    if (isFormLoading) {
      return;
    } else {
      closeModal();
      setErrors({});
    }
  };

  const handleChangeSelect = (name: string, values: string[]) => {
    setFormData({
      ...formData,
      [name]: values,
    });

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  useEffect(() => {
    if (isEditGroup) {
      setFormData({
        ...formData,
        groupName: isEditGroup.groupName || "",
        members: isEditGroup.members.map((member) => member._id) || [],
      });
    } else {
      setFormData({
        groupName: "",
        members: [],
      });
    }
  }, [isEditGroup]);

  const handleSubmit = async () => {
    try {
      await chatGroupSchema.validate(formData, { abortEarly: false });

      if (isEditGroup) {
        const { data, error } = await putChatGroup({
          form: formData,
          id: isEditGroup._id,
        });
        if (error) {
          toast.error((error as any)?.data.message);
        } else {
          toast.success(data.message);
          setFormData({
            groupName: "",
            members: [],
          });
          handleCloseModal();
        }
      } else {
        const { data, error } = await postChatGroup(formData);
        if (error) {
          toast.error((error as any)?.data.message);
        } else {
          toast.success(data.message);
          closeModal();
          setFormData({
            groupName: "",
            members: [],
          });
        }
      }
    } catch (validationsErrors: any) {
      const errors = transformYupErrorsIntoObject(validationsErrors);
      setErrors(errors);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditGroup ? "Edit Group" : "Create Group"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <CustomTextField
            label="Group Name*"
            placeholder="Group Name"
            fieldName="groupName"
            value={formData.groupName}
            onChangeInput={(event) => handleChangeInput(event)}
            error={errors?.groupName}
            onClickInput={() => handleClickInput("groupName")}
          />
          <div>
            <MultiSelect
              customWidth={462}
              placeholder="Select Teacher"
              label="Teachers*"
              options={teachersDropdown?.data.teachers || []}
              value={formData.members}
              onChange={(values) => handleChangeSelect("members", values)}
              error={errors?.members}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              disabled={isFormLoading}
              variant="outline"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button disabled={isFormLoading} onClick={handleSubmit}>
              {isFormLoading ? <CircularProgress /> : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddChatGroupDialog;
