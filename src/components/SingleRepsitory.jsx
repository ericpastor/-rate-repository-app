import { format } from "date-fns";
import { openURL } from "expo-linking";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useParams } from "react-router-native";
import useSingleRepository from "../hooks/useSingleRepository";
import theme from "../theme";
import { parseThousands } from "./RepositoryStats";

import StyledText from "./StyledText";

const RepositoryInfo = ({ repository }) => {
  console.log(repository);

  const handlerPress = async () => {
    await openURL(repository.url);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", paddingBottom: 2 }}>
        <View style={{ paddingRight: 20 }}>
          <Image
            style={styles.image}
            source={{ uri: repository.ownerAvatarUrl }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <StyledText testID="fullName" fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </StyledText>
          <StyledText color="secondary">{repository.description}</StyledText>
          <StyledText style={styles.language}>
            {" "}
            {repository.language}
          </StyledText>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View>
          <StyledText align="center" fontWeight="bold">
            {parseThousands(repository.stargazersCount)}
          </StyledText>
          <StyledText align="center">Stars</StyledText>
        </View>
        <View>
          <StyledText align="center" fontWeight="bold">
            {parseThousands(repository.forksCount)}
          </StyledText>
          <StyledText align="center">Forks</StyledText>
        </View>
        <View>
          <StyledText align="center" fontWeight="bold">
            {repository.reviewCount}
          </StyledText>
          <StyledText align="center">Review</StyledText>
        </View>
        <View>
          <StyledText align="center" fontWeight="bold">
            {repository.ratingAverage}
          </StyledText>
          <StyledText align="center">Rating</StyledText>
        </View>
      </View>
      <View style={styles.form}>
        <Button onPress={handlerPress} title="Open in Github" />
      </View>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const { user } = review;
  console.log(user);
  if (user === undefined) return null;

  const { username } = user;
  console.log(username);

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
            {username}
          </StyledText>
          <StyledText color="secondary" style={{ marginBottom: 5 }}>
            {format(new Date(review.createdAt), "dd-MM-yyyy")}
          </StyledText>
          <StyledText> {review.text}</StyledText>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const { repository, loading } = useSingleRepository({
    repositoryId: id,
  });
  if (loading) {
    return <Text>loading...</Text>;
  }

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
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

const styles = StyleSheet.create({
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
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  form: {
    margin: 12,
  },
});

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

export default SingleRepository;
