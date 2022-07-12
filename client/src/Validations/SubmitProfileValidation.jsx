import * as yup from "yup";

export const SubmitProfileSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup.string().required(),
  gender: yup
    .string()
    .required("Must provide a gender")
    .oneOf(["male", "female"]),
  weight: yup
    .number()
    .typeError("you must specify a number")
    .min(45, "Min value 45.")
    .max(150, "Max value 150."),
  height: yup
    .number()
    .typeError("you must specify a number")
    .min(140, "Min value 140.")
    .max(210, "Max value 210."),
  activity: yup
    .string()
    .required("Must provide a gender")
    .oneOf(["sedentary", "low-active", "medium-active", "very-active"]),
});
