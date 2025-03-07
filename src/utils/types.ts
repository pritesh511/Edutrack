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
  email: string;
  experience: number;
  educations: string[];
  standards: Array<Standard>;
  subjects: Array<Subject>;
}

export interface Dashboard {
  standards: Array<Standard>;
  students: Array<Standard>;
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
  dob: Date | null;
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
  attendance: {
    date: Date;
    status: string;
  }[];
}

export interface CurrentUser {
  _id: string;
  schoolName: string;
  email: string;
  role: string;
  teacherId: string | null;
  teacherName: string | null;
  schoolOwnerName: string;
  mobileNo: string;
  address: string;
  city: string;
  district: string;
  pincode: string;
}

export interface ChatGroup {
  _id: string;
  groupName: string;
  createdAt: Date;
  members: Array<Teacher>;
}

export interface CalenderEvent {
  _id: string;
  title: string;
  start: Date;
  end: Date;
}
