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
import CustomSelect from "@/components/common/CustomSelect";
import { MultiSelect } from "@/components/common/MultiSelect";

interface TeacherForm {
  name: string;
  experience: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddTeacherDialog = React.memo(function AddTeacherDialog(props: Props) {
  const { open, onClose } = props;
  const [formData, setFormData] = useState<TeacherForm>({
    name: "",
    experience: 0,
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
              options={[
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
                { label: "Option 3", value: "option3" },
                { label: "Option 4", value: "option4" },
              ]}
              value={[]}
              onChange={() => {}}
            />
          </div>
          <div>
            <MultiSelect
              customWidth={462}
              label="Standard"
              placeholder="Select Standard"
              options={[
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
                { label: "Option 3", value: "option3" },
                { label: "Option 4", value: "option4" },
              ]}
              value={[]}
              onChange={() => {}}
            />
          </div>
          <div>
            <MultiSelect
              customWidth={462}
              label="Standard"
              placeholder="Select Standard"
              options={[
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
                { label: "Option 3", value: "option3" },
                { label: "Option 4", value: "option4" },
              ]}
              value={[]}
              onChange={() => {}}
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
