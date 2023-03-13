import * as yup from "yup";

export const createReviewValidationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),

  repositoryName: yup.string().required("Repository name is required"),

  rating: yup
    .number()
    .min(1, "Require more than 0")
    .max(100, "Require 100 or less!")
    .required("Rating is required"),

  text: yup.string().required("Review text is required"),
});
