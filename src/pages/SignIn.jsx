import { Button, StyleSheet, View } from "react-native";
import { Formik, useField } from "formik";
import StyleTextInpunt from "../components/StyledTextInput";
import StyledText from "../components/StyledText";
import { signInValidationSchema } from "../validationSchemas/SignIn";

const initialValues = {
  email: "",
  password: "",
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

const SignIn = () => {
  return (
    <Formik
      validationSchema={signInValidationSchema}
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit }) => {
        return (
          <View style={styles.form}>
            <FormikInputValue name="email" placeholder="e-mail" />
            <FormikInputValue
              name="password"
              placeholder="password"
              secureTextEntry
            />
            <Button onPress={handleSubmit} title="Sign In" />
          </View>
        );
      }}
    </Formik>
  );
};

export default SignIn;
