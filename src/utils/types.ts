export interface Subject {
  _id: string;
  image: string;
  subjectName: string;
  description: string;
}

export interface Standard {
  _id: string;
  standard: string;
  description: string;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export interface Teacher {
  _id: string;
  name: string;
  experience: number;
  educations: string[];
  standards: Array<Standard>;
  subjects: Array<Subject>;
}

export interface Student {
  _id: string;
  name: string;
  roleNo: number;
  standard: {
    _id: string;
    standard: string;
    description: string;
  };
  address: string;
  fatherName: string;
  fatherMobileNo: string;
  fatherOccupation: string;
  fatherEmail: string;
  motherName: string;
  motherOccupation: string;
  motherMobileNo: string;
  classTeacher: {
    _id: string;
    name: string;
    experience: string;
    educations: string[];
    standards: Standard[];
    subjects: Subject[];
  };
}
