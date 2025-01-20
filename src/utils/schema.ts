import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const teacherSchema = Yup.object().shape({
  name: Yup.string().required("Please enter teacher name"),
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
  email: Yup.string().required("Please enter email").email("Please enter valid email"),
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
