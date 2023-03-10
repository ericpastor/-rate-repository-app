import { Button, StyleSheet, View } from "react-native";
import { Formik, useField } from "formik";
import StyleTextInpunt from "../components/StyledTextInput";
import StyledText from "../components/StyledText";
import { createReviewValidationSchema } from "../validationSchemas/CreateReview";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const initialValues = {
  repositoryName: "",
  ownerName: "",
  rating: "",
  text: "",
};

const styles = StyleSheet.create({
  error: {
    color: "#d73a4a",
    fontSize: 10,
    marginBottom: 20,
  },
  form: {
    margin: 12,
  },
});

const FormikInputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <StyleTextInpunt
        multiline={true}
        error={meta.error}
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        {...props}
      />
      {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
    </>
  );
};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={createReviewValidationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <View style={styles.form}>
            <FormikInputValue
              name="repositoryName"
              placeholder="Repository name"
              placeholderTextColor="grey"
            />

            <FormikInputValue
              name="ownerName"
              placeholder="Repository owner name"
              placeholderTextColor="grey"
            />

            <FormikInputValue
              name="rating"
              placeholder="Rating between 0 and 100"
              placeholderTextColor="grey"
            />
            <FormikInputValue
              name="text"
              placeholder="Review"
              placeholderTextColor="grey"
            />
            <Button onPress={handleSubmit} title="Create a review" />
          </View>
        );
      }}
    </Formik>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const { data } = await createReview({
        repositoryName,
        ownerName,
        rating: Number(rating),
        text,
      });
      console.log(data);
      const { createReview } = data;
      const { repositoryId } = createReview;
      navigate(`/repository/${repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <CreateReviewContainer onSubmit={onSubmit} createReview={[createReview]} />
  );
};
export default CreateReview;
