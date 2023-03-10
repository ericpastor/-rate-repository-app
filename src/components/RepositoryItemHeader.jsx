import { Image, StyleSheet, View } from "react-native";
import StyledText from "./StyledText";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import { Pressable } from "react-native";

const RepositoryItemHeader = ({ repositories }) => {
  const { id, fullName, description, language, ownerAvatarUrl } = repositories;

  const navigate = useNavigate();

  const handlerPress = () => {
    navigate(`/repository/${id}`);
  };

  return (
    <Pressable onPress={handlerPress}>
      <View style={{ flexDirection: "row", paddingBottom: 2 }}>
        <View style={{ paddingRight: 20 }}>
          <Image style={styles.image} source={{ uri: ownerAvatarUrl }} />
        </View>
        <View style={{ flex: 1 }}>
          <StyledText testID="fullName" fontSize="subheading" fontWeight="bold">
            {fullName}
          </StyledText>
          <StyledText color="secondary">{description}</StyledText>
          <StyledText style={styles.language}> {language}</StyledText>
        </View>
      </View>
    </Pressable>
  );
};
export const styles = StyleSheet.create({
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
});

export default RepositoryItemHeader;
