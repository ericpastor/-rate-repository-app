import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import StyledText from "./StyledText";
import Constants from "expo-constants";
import { Link, useLocation, useNavigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.appBar.primary,
    paddingTop: Constants.statusBarHeight + 10,
    flexDirection: "row",
  },
  scroll: {
    paddingBottom: 15,
  },
  active: {
    color: theme.appBar.textPrimary,
  },
  text: {
    color: theme.appBar.textSecondary,
    paddingHorizontal: 20,
  },
});

const AppBarTab = ({ children, to }) => {
  const { pathname } = useLocation();
  const active = pathname === to;

  const textStyles = [styles.text, active && styles.active];

  return (
    <Link to={to}>
      <StyledText fontWeight="bold" style={textStyles}>
        {children}
      </StyledText>
    </Link>
  );
};

const AppBar = () => {
  const { loading, error, data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  console.log(data?.me);

  if (loading) return <Text>Loading ...</Text>;
  if (error) return <Text>Error!</Text>;

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <AppBarTab to="/">Repositories</AppBarTab>

        {data?.me ? (
          <>
            <AppBarTab to="/createReview">Create a review</AppBarTab>
            <AppBarTab to="/myreviews">My reviews</AppBarTab>
            <Pressable style={styles.text} onPress={handleSignOut}>
              <StyledText fontWeight="bold" style={styles.text}>
                Sign Out
              </StyledText>
            </Pressable>
          </>
        ) : (
          <>
            <AppBarTab to="/signin">Sign in</AppBarTab>
            <AppBarTab to="/signup">Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
