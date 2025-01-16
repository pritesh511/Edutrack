import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/common/MultiSelect";
import { EDUCAtION_LIST } from "@/utils/constant";
import { useGetStandardDropdownQuery } from "@/redux/query/standard";
import { useGetSubjectDropdownQuery } from "@/redux/query/subject";

interface TeacherForm {
  name: string;
  experience: number;
  educations: Array<string>;
  standards: Array<string>;
  subjects: Array<string>;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddTeacherDialog = React.memo(function AddTeacherDialog(props: Props) {
  const { open, onClose } = props;
  const { data: subjectDropdownData } = useGetSubjectDropdownQuery("");
  const { data: standardDrodownData } = useGetStandardDropdownQuery("");
  const [formData, setFormData] = useState<TeacherForm>({
    name: "",
    experience: 0,
    educations: [],
    standards: [],
    subjects: [],
  });

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
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Teacher</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Teacher Name</Label>
            <Input
              placeholder="Teacher Name"
              name="name"
              value={formData.name}
              onChange={(event) => handleChangeInput(event)}
            />
          </div>
          <div>
            <Label htmlFor="name">Experience</Label>
            <Input
              placeholder="Total Experience"
              name="experience"
              type="number"
              value={formData.experience ? formData.experience : ""}
              onChange={(event) => handleChangeInput(event)}
            />
          </div>
          <div>
            <MultiSelect
              customWidth={462}
              placeholder="Select Education"
              label="Education"
              options={EDUCAtION_LIST}
              value={formData.educations}
              onChange={(values) => handleChangeSelect("educations", values)}
            />
          </div>
          <div>
            <MultiSelect
              customWidth={462}
              label="Standard"
              placeholder="Select Standard"
              options={standardDrodownData?.standards || []}
              value={formData.standards}
              onChange={(values) => handleChangeSelect("standards", values)}
            />
          </div>
          <div>
            <MultiSelect
              customWidth={462}
              label="Subject"
              placeholder="Select Subject"
              options={subjectDropdownData?.subjects || []}
              value={formData.subjects}
              onChange={(values) => handleChangeSelect("subjects", values)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default AddTeacherDialog;
