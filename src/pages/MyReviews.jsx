import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";
import StyledText from "../components/StyledText";
import { DELETE_REVIEW } from "../graphql/mutations";
import useMyReviews from "../hooks/useMyReviews";
import theme from "../theme";

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const { repository } = review;
  console.log(repository);
  if (repository === undefined) return null;

  const { fullName } = repository;
  console.log(fullName);

  const { id } = repository;
  console.log(id);

  const reviewId = review.id;
  console.log(reviewId);

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleSubmit = () => {
    navigate(`/repository/${id}`);
  };

  const handleDelete = async () => {
    const { data } = await deleteReview({
      variables: { deleteReviewId: reviewId },
    });
    if (data.deleteReview) refetch();
  };

  return (
    <View style={reviewStyles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 2,
        }}
      >
        <View style={{ paddingRight: 20 }}>
          <Text style={[{ justifyContent: "center" }, reviewStyles.rating]}>
            {review.rating}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <StyledText fontSize="subheading" fontWeight="bold">
            {fullName}
          </StyledText>
          <StyledText color="secondary" style={{ marginBottom: 5 }}>
            {format(new Date(review.createdAt), "dd-MM-yyyy")}
          </StyledText>
          <StyledText> {review.text}</StyledText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 10,
          justifyContent: "space-evenly",
        }}
      >
        <Button onPress={handleSubmit} title="View repository" />

        <Button color={"red"} onPress={handleDelete} title="Delete review" />
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { me, loading, refetch } = useMyReviews({
    includeReviews: true,
  });
  if (loading) {
    return <Text>loading...</Text>;
  }
  console.log(me);
  const reviews = me?.reviews ? me?.reviews.edges.map((edge) => edge.node) : [];

  console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 10,
            backgroundColor: "grey",
            marginTop: 10,
          }}
        >
          <ReviewItem review={reviews} />
        </View>
      )}
    />
  );
};

const reviewStyles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
  },

  language: {
    padding: 4,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
    marginTop: 6,
  },

  rating: {
    padding: 5,
    borderRadius: 58 / 2,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 58,
    height: 58,
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
    textAlign: "center",
  },
});

export default MyReviews;
