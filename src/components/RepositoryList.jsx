import { FlatList, Text } from "react-native";
import useRepositories from "../hooks/useRepositories";

import RepositoryItem from "./RepositoryItem";

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={() => <Text> </Text>}
      renderItem={({ item: repo }) => <RepositoryItem {...repo} />}
    ></FlatList>
  );
};

export default RepositoryList;
