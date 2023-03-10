import { Button, StyleSheet, View } from "react-native";
import { Formik, useField } from "formik";
import StyleTextInpunt from "../components/StyledTextInput";
import StyledText from "../components/StyledText";
import { useNavigate } from "react-router-native";
import { signUpValidationSchema } from "../validationSchemas/SignUp";
import useSignUp from "../hooks/useSignUp";

const initialValues = {
  username: "",
  password: "",
  passwordConfim: "",
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
        error={meta.error}
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        {...props}
      />
      {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
    </>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={signUpValidationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <View style={styles.form}>
            <FormikInputValue
              name="username"
              placeholder="username"
              placeholderTextColor="grey"
            />
            <FormikInputValue
              name="password"
              placeholder="password"
              placeholderTextColor="grey"
            />
            <FormikInputValue
              name="passwordConfirm"
              placeholder="passwordConfirm"
              placeholderTextColor="grey"
            />
            <Button
              onPress={handleSubmit}
              title="Sign Up"
              testID="signUpButton"
            />
          </View>
        );
      }}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signUp({ username, password });
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} signUp={[signUp]} />;
};

export default SignUp;
