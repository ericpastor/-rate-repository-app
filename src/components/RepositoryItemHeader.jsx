import { Image, StyleSheet, View } from "react-native";
import theme from "../theme";
import StyledText from "./StyledText";

const RepositoryItemHeader = ({
  ownerAvatarUrl,
  fullName,
  description,
  language,
}) => (
  <View style={{ flexDirection: "row", paddingBottom: 2 }}>
    <View style={{ paddingRight: 20 }}>
      <Image style={styles.image} source={{ uri: ownerAvatarUrl }} />
    </View>
    <View style={{ flex: 1 }}>
      <StyledText fontSize="subheading" fontWeight="bold">
        {fullName}
      </StyledText>
      <StyledText color="secondary">{description}</StyledText>
      <StyledText style={styles.language}> {language}</StyledText>
    </View>
  </View>
);

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
