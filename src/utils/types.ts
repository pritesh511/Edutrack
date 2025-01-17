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
  mobileNo: string;
  address: string;
}
