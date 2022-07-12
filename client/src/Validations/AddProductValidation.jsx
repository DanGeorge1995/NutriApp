import * as yup from "yup";

export const AddProductSchema = yup.object().shape({
  productName: yup.string().required(),
  category: yup
    .string()
    .required("Must provide a gender")
    .oneOf(["meat", "cheese", "fruits", "vegetables"]),
  um: yup.string().required(),
  quantity: yup.number().typeError("you must specify a number").required(),
  calories: yup.number().typeError("you must specify a number").required(),
  protein: yup.number().typeError("you must specify a number").required(),
  fat: yup.number().typeError("you must specify a number").required(),
  carbs: yup.number().typeError("you must specify a number").required(),
});
