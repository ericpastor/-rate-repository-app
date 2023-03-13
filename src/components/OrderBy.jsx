import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";

export default function SortPicker({
  repositoriesOrder,
  setOrderBy,
  searchKeyword,
  setSearchKeyword,
}) {
  const { latest } = repositoriesOrder;
  const { highestRated } = repositoriesOrder;
  const { lowestRated } = repositoriesOrder;

  const onChangeSearch = (query) => setSearchKeyword(query);

  return (
    <>
      <View style={{ backgroundColor: "#EDE7F6", height: 50 }}>
        <Searchbar
          style={styles.search}
          placeholder="Search"
          value={searchKeyword}
          onChangeText={onChangeSearch}
        />
      </View>
      <>
        <View
          style={{
            paddingTop: 0,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Picker
            style={styles.picker}
            selectedValue={repositoriesOrder}
            onValueChange={(v) => {
              if (v === "latest") setOrderBy({ ...latest });
              if (v === "highestRated") setOrderBy({ ...highestRated });
              if (v === "lowestRated") setOrderBy({ ...lowestRated });
            }}
          >
            <Picker.Item
              style={{ color: "grey" }}
              label="Select an item..."
              enabled={false}
            />
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item
              label="Highest rated repositories"
              value="highestRated"
            />
            <Picker.Item
              label="Lowest rated repositories"
              value="lowestRated"
            />
          </Picker>
        </View>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    margin: 5,
  },
  picker: {
    width: "100%",
    height: 0,
    margin: 1,
    borderWidth: 0,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  search: {
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
    height: 50,
    marginBottom: 0,
    borderRadius: 8,
  },

  item: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

// import { useState } from "react";
// import { Platform, StyleSheet, View } from "react-native";
// import {
//   Menu,
//   Divider,
//   Text,
//   Searchbar,
//   Appbar,
//   useTheme,
//   Provider,
// } from "react-native-paper";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// import theme from "../theme";

// const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

// const OrderByAndSearch = ({
//   repositoriesOrder,
//   setOrderBy,
//   searchKeyword,
//   setSearchKeyword,
// }) => {
//   const [visible, setVisible] = useState("");

//   const { isV3 } = useTheme();

//   const _toggleMenu = (name) => () =>
//     setVisible({ ...visible, [name]: !visible[name] });

//   const _getVisible = (name) => !!visible[name];

//   const onChangeSearch = (query) => setSearchKeyword(query);

//   return (
//     <SafeAreaProvider>
//       <>
//         <Searchbar
//           style={(theme.fontSizes.subheading, styles.md3Divider)}
//           placeholder="Search"
//           value={searchKeyword}
//           onChangeText={onChangeSearch}
//         />

//         <Appbar.Header elevated>
//           <Appbar.Content title="Latest repositories" />
//           <Appbar.Action
//             icon={MORE_ICON}
//             onPress={_toggleMenu("menu1")}
//             {...(!isV3 && { color: "white" })}
//           />
//         </Appbar.Header>
//         <View>
//           <Provider>
//             <View>
//               <Menu
//                 style={{
//                   backgroundColor: "#222",
//                   top: 150,
//                   left: 100,
//                   position: "absolute",
//                   zIndex: 100,
//                 }}
//                 visible={_getVisible("menu1")}
//                 onDismiss={_toggleMenu("menu1")}
//                 anchor={{ x: 50, y: 100 }}
//               >
//                 <Text style={{ paddingBottom: 10, color: "grey" }}>
//                   Select an item...
//                 </Text>

//                 <Menu.Item
//                   onPress={() => {
//                     setOrderBy({ ...repositoriesOrder.latest });
//                   }}
//                   title="Latest repositories"
//                 />
//                 <Divider />
//                 <Menu.Item
//                   onPress={() => {
//                     setOrderBy({ ...repositoriesOrder.highestRated });
//                   }}
//                   title="Highest rated repositories"
//                 />
//                 <Divider />
//                 <Menu.Item
//                   onPress={() => {
//                     setOrderBy({ ...repositoriesOrder.lowestRated });
//                   }}
//                   title="Lowest rated repositories"
//                 />
//               </Menu>
//             </View>
//           </Provider>
//         </View>
//       </>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     marginBottom: 30,
//     zIndex: 100,
//   },
//   container: {
//     paddingTop: 48,
//   },
//   list: {
//     marginTop: 48,
//   },
//   alignCenter: {
//     alignItems: "center",
//   },
//   md3Divider: {
//     marginVertical: 8,
//   },
// });

// export default OrderByAndSearch;
