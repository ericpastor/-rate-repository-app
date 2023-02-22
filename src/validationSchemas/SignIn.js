import * as yup from "yup";

export const signInValidationSchema = yup.object().shape({
  email: yup.string().email().required("e-mail is required"),

  password: yup
    .string()
    .min(5, "Too short!")
    .max(200, "Too long!")
    .required("Password is required"),
});
