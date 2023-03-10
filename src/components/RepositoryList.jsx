import React, { useState } from "react";
import { FlatList, Text } from "react-native";
import { useDebounce } from "use-debounce";
import useRepositories from "../hooks/useRepositories";
import OrderByAndSearch from "./OrderBy";
import RepositoryItem from "./RepositoryItem";

const repositoriesOrder = {
  latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  highestRated: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  lowestRated: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    console.log(props);
  };
  render() {
    const props = this.props;
    const { repositories } = props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        testID="repositoryItem"
        ItemSeparatorComponent={() => <Text> </Text>}
        ListHeaderComponent={this.renderHeader}
      ></FlatList>
    );
  }
}
const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState({ ...repositoriesOrder.latest });
  const [searchKeyword, setSearchKeyword] = useState("");

  const [value] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories(
    value ? { searchKeyword: value } : orderBy
  );

  return (
    <>
      <OrderByAndSearch
        setOrderBy={setOrderBy}
        repositoriesOrder={repositoriesOrder}
        setSearchKeyword={setSearchKeyword}
      />
      <Text style={{ paddingTop: 5 }}> </Text>
      <RepositoryListContainer
        repositories={repositories}
        orderBy={orderBy}
        searchKeyword={searchKeyword}
      />
    </>
  );
};

export default RepositoryList;
