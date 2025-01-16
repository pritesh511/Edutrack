import * as Yup from "yup";

export const teacherSchema = Yup.object().shape({
  name: Yup.string().required("Please enter teacher name"),
  experience: Yup.number()
    .required("Please enter year of experience")
    .min(1, "Experience should more than 0"),
  educations: Yup.array().min(1, 'Please select education'),
  standards: Yup.array().min(1, 'Please select standard'),
  subjects: Yup.array().min(1, 'Please select subject'),
});
