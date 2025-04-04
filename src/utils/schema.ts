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

export const subjectSchema = Yup.object().shape({
  subjectName: Yup.string().required("Please enter subject"),
  description: Yup.string().required("Please enter subject description"),
  file: Yup.mixed().required("Image is required").nullable(),
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

export const schoolBasicInfoSchema = Yup.object().shape({
  schoolName: Yup.string().required("Please enter school name"),
  schoolOwnerName: Yup.string().required("Please enter school owner name"),
  email: Yup.string()
    .required("Please enter email")
    .email("Please enter valid email"),
  mobileNo: Yup.string().required("Please enter mobile number"),
});

export const schoolAddressInfoSchema = Yup.object().shape({
  address: Yup.string().required("Please enter school address"),
  city: Yup.string().required("Please enter school city"),
  district: Yup.string().required("Please enter school district"),
  pincode: Yup.string().required("Please enter school pincode"),
});

export const schoolAccountInfoSchema = Yup.object().shape({
  password: Yup.string()
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Please enter password"),
  confirm_password: Yup.string()
    .required("Please enter confirm password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const schoolProfileSettingSchema = Yup.object().shape({
  schoolName: Yup.string().required("Please enter school name"),
  schoolOwnerName: Yup.string().required("Please enter school owner name"),
  email: Yup.string()
    .required("Please enter email")
    .email("Please enter valid email"),
  mobileNo: Yup.string().required("Please enter mobile number"),
  address: Yup.string().required("Please enter school address"),
  city: Yup.string().required("Please enter school city"),
  district: Yup.string().required("Please enter school district"),
  pincode: Yup.string().required("Please enter school pincode"),
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
