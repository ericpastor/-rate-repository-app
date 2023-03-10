import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import createApolloClient from "./src/utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import Constants from "expo-constants";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  console.log(Constants.manifest);
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <StatusBar style="light" />
        <NativeRouter>
          <Main />
        </NativeRouter>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
};

export default App;
