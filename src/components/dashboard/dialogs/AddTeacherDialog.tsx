import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MultiSelect } from "@/components/custom/MultiSelect";
import { EDUCAtION_LIST } from "@/utils/constant";
import { useGetStandardDropdownQuery } from "@/redux/query/standard";
import { useGetSubjectDropdownQuery } from "@/redux/query/subject";
import toast from "react-hot-toast";
import { teacherSchema } from "@/utils/schema";
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import CustomTextField from "@/components/custom/CustomTextField";
import {
  usePostTeacherMutation,
  usePutTeacherMutation,
} from "@/redux/query/teacher";
import CircularProgress from "@/components/common/CircularProgress";
import { Teacher } from "@/utils/types";

interface TeacherForm {
  name: string;
  email: string;
  experience: number;
  educations: Array<string>;
  standards: Array<string>;
  subjects: Array<string>;
}

interface Props {
  open: boolean;
  onClose: () => void;
  isEditTeacher: Teacher | null;
}

const AddTeacherDialog = React.memo(function AddTeacherDialog(props: Props) {
  const { open, onClose, isEditTeacher } = props;
  const { data: subjectDropdownData } = useGetSubjectDropdownQuery("");
  const { data: standardDrodownData } = useGetStandardDropdownQuery("");
  const [postTeacher, { isLoading: postTeacherLoading }] =
    usePostTeacherMutation();
  const [putTeacher, { isLoading: putTeacherLoading }] =
    usePutTeacherMutation();
  const [formData, setFormData] = useState<TeacherForm>({
    name: "",
    email: "",
    experience: 0,
    educations: [],
    standards: [],
    subjects: [],
  });
  const [errors, setErrors] = useState<any>({});

  const isFormLoading = postTeacherLoading || putTeacherLoading;

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

  const handleClickInput = (name: string) => {
    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  useEffect(() => {
    if (isEditTeacher) {
      setFormData({
        ...formData,
        name: isEditTeacher.name || "",
        email: isEditTeacher.email || "",
        experience: isEditTeacher.experience || 0,
        educations: isEditTeacher.educations || [],
        standards: isEditTeacher.standards.map((std) => std._id) || [],
        subjects: isEditTeacher.subjects.map((sub) => sub._id) || [],
      });
    } else {
      setFormData({
        name: "",
        email: "",
        experience: 0,
        educations: [],
        standards: [],
        subjects: [],
      });
    }
  }, [isEditTeacher]);

  const handleCloseModal = () => {
    if (!isFormLoading) {
      setErrors({});
      onClose();
    }
  };

  const handleSubmitForm = async () => {
    try {
      await teacherSchema.validate(formData, { abortEarly: false });

      if (isEditTeacher) {
        const { data, error } = await putTeacher({
          form: formData,
          id: isEditTeacher._id,
        });
        if (error) {
          toast.error((error as any)?.data.message);
        } else {
          toast.success(data.message);
          setFormData({
            name: "",
            email: "",
            experience: 0,
            educations: [],
            standards: [],
            subjects: [],
          });
          handleCloseModal();
        }
      } else {
        const { data, error } = await postTeacher(formData);
        if (error) {
          toast.error((error as any)?.data.message);
        } else {
          toast.success(data.message);
          setFormData({
            name: "",
            email: "",
            experience: 0,
            educations: [],
            standards: [],
            subjects: [],
          });
          handleCloseModal();
        }
      }
    } catch (validationsErrors: any) {
      const errors = transformYupErrorsIntoObject(validationsErrors);
      setErrors(errors);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="md:h-[calc(100vh-47px)] lg:h-auto overflow-auto md:max-w-lg lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Teacher</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-3">
          <CustomTextField
            label="Teacher Name*"
            fieldName="name"
            placeholder="Teacher Name"
            value={formData.name}
            onChangeInput={(event) => handleChangeInput(event)}
            error={errors?.name}
            onClickInput={() => handleClickInput("name")}
          />
          <CustomTextField
            label="Email*"
            fieldName="email"
            placeholder="Email"
            value={formData.email}
            onChangeInput={(event) => handleChangeInput(event)}
            error={errors?.email}
            onClickInput={() => handleClickInput("email")}
          />
          <CustomTextField
            label="Experience*"
            fieldName="experience"
            placeholder="Teacher Name"
            type="number"
            value={formData.experience}
            onChangeInput={(event) => handleChangeInput(event)}
            error={errors?.experience}
            onClickInput={() => handleClickInput("experience")}
          />
          <div>
            <MultiSelect
              customWidth={420}
              placeholder="Select Education"
              label="Education*"
              options={EDUCAtION_LIST}
              value={formData.educations}
              onChange={(values) => handleChangeSelect("educations", values)}
              error={errors?.educations}
            />
          </div>
          <div>
            <MultiSelect
              customWidth={420}
              label="Standard*"
              placeholder="Select Standard"
              options={standardDrodownData?.data.standards || []}
              value={formData.standards}
              onChange={(values) => handleChangeSelect("standards", values)}
              error={errors?.standards}
            />
          </div>
          <div>
            <MultiSelect
              customWidth={420}
              label="Subject*"
              placeholder="Select Subject"
              options={subjectDropdownData?.subjects || []}
              value={formData.subjects}
              onChange={(values) => handleChangeSelect("subjects", values)}
              error={errors?.subjects}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            disabled={isFormLoading}
            variant="outline"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmitForm} disabled={isFormLoading}>
            {isFormLoading ? <CircularProgress /> : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddTeacherDialog;
