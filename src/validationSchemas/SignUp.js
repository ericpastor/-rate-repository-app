import * as yup from "yup";

export const signUpValidationSchema = yup.object().shape({
  username: yup.string(),

  password: yup
    .string()
    .min(5, "Too short!")
    .max(200, "Too long!")
    .required("Password is required"),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirm is required"),
});
