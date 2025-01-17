import * as Yup from "yup";

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
  mobileNo: Yup.string().required("Please enter mobile no"),
  address: Yup.string().required("Please enter address"),
});
