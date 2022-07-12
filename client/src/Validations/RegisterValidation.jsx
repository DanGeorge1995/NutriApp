import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(25).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords should match!"),
});
