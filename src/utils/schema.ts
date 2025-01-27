import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const teacherSchema = Yup.object().shape({
  name: Yup.string().required("Please enter teacher name"),
  email: Yup.string()
    .required("Please enter email")
    .email("Please enter valid email"),
  experience: Yup.number()
    .required("Please enter year of experience")
    .min(1, "Experience should more than 0"),
  educations: Yup.array().min(1, "Please select education"),
  standards: Yup.array().min(1, "Please select standard"),
  subjects: Yup.array().min(1, "Please select subject"),
});

export const studentSchema = Yup.object().shape({
  name: Yup.string().required("Please enter teacher name"),
  roleNo: Yup.number()
    .required("Please enter role no")
    .min(1, "Role no should more than 0"),
  standard: Yup.string().required("Please select standard"),
  dob: Yup.date().required("Please select date of birth"),
  address: Yup.string().required("Please enter address"),
  fatherName: Yup.string().required("Please enter father name"),
  fatherMobileNo: Yup.string().required("Please enter father mobile number"),
  motherName: Yup.string().required("Please enter mother name"),
  classTeacher: Yup.string().required("Please select class teacher"),
});

export const subjectSchema = Yup.object().shape({
  subjectName: Yup.string().required("Please enter subject"),
  description: Yup.string().required("Please enter subject description"),
  file: Yup.mixed().required("Image is required").nullable(),
});

export const standardSchema = Yup.object().shape({
  standard: Yup.string().required("Please enter subject"),
  description: Yup.string().required("Please enter standard description"),
});

export const loginSchema = Yup.object().shape({
  role: Yup.string().required("Role is required"),
  email: Yup.string()
    .required("Please enter email")
    .email("Please enter valid email"),
  schoolEmail: Yup.string().when("role", (role: string | string[], schema) => {
    const roleVal = Array.isArray(role) ? role[0] : role;
    return roleVal === "teacher"
      ? schema
          .required("Please enter school email")
          .email("Please enter a valid school email")
      : schema;
  }),
  password: Yup.string().required("Please enter password"),
});

export const signupSchema = Yup.object().shape({
  schoolName: Yup.string().required("Please enter school name"),
  email: Yup.string()
    .required("Please enter email")
    .email("Please enter valid email"),
  password: Yup.string()
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Please enter password"),
  confirm_password: Yup.string()
    .required("Please enter confirm password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const contactUsSchema = Yup.object().shape({
  name: Yup.string().required("Please enter name"),
  email: Yup.string()
    .required("Please enter email")
    .email("Please enter valid email"),
  message: Yup.string().required("Please enter message"),
});

export const chatGroupSchema = Yup.object().shape({
  groupName: Yup.string().required("Please enter group name"),
  members: Yup.array().min(1, "Please select teacher"),
});

export const eventSchema = Yup.object().shape({
  title: Yup.string().required("Please enter event title"),
});
