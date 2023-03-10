import { View } from "react-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import { Route, Routes } from "react-router-native";
import SignIn from "../pages/SignIn";
import SingleRepository from "./SingleRepsitory";
import CreateReview from "../pages/CreateReview";
import SignUp from "../pages/SignUp";
import MyReviews from "../pages/MyReviews";

const Main = () => {
  return (
    <View style={{ flexGrow: 1 }}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/createReview" element={<CreateReview />} exact />
        <Route path="/myreviews" element={<MyReviews />} exact />
        <Route path="/repository/:id" element={<SingleRepository />} exact />
      </Routes>
    </View>
  );
};

export default Main;
