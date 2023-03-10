import { StyleSheet, View } from "react-native";
import theme from "../theme";
import RepositoryItemHeader from "./RepositoryItemHeader";
import RepositoryStats from "./RepositoryStats";

const RepositoryItem = ({ item }) => {
  return (
    <View key={item.id} style={styles.container}>
      <RepositoryItemHeader repositories={item} />
      <RepositoryStats {...item} />
    </View>
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

export default RepositoryItem;
