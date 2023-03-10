import { useState } from "react";
import { View } from "react-native";
import {
  Menu,
  Divider,
  Provider,
  HelperText,
  Text,
  Searchbar,
} from "react-native-paper";
import theme from "../theme";

const OrderByAndSearch = ({
  repositoriesOrder,
  setOrderBy,
  searchKeyword,
  setSearchKeyword,
}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onChangeSearch = (query) => setSearchKeyword(query);

  return (
    <>
      <Searchbar
        style={theme.fontSizes.subheading}
        placeholder="Search"
        value={searchKeyword}
        onChangeText={onChangeSearch}
      />
      <View
        style={{
          zIndex: 100,
          paddingTop: 15,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "grey",
        }}
      >
        <Provider>
          <Menu
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "grey",
            }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <HelperText
                style={{
                  fontSize: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 30,
                }}
                leadingIcon="menu"
                color="black"
                onPress={openMenu}
              >
                Latest repositories
              </HelperText>
            }
          >
            <Text style={{ paddingBottom: 10, color: "grey" }}>
              Select an item...
            </Text>
            <Menu.Item
              onPress={() => {
                setOrderBy({ ...repositoriesOrder.latest }), closeMenu();
              }}
              title="Latest repositories"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                setOrderBy({ ...repositoriesOrder.highestRated }), closeMenu();
              }}
              title="Highest rated repositories"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                setOrderBy({ ...repositoriesOrder.lowestRated }), closeMenu();
              }}
              title="Lowest rated repositories"
            />
          </Menu>
        </Provider>
      </View>
    </>
  );
};

export default OrderByAndSearch;
