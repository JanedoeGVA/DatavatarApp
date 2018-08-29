import React from "react";

import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Alert,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";

const items = [
  { key: "One" },
  { key: "Two" },
  { key: "Three" },
  { key: "Four" },
  { key: "Five" },
  { key: "Six" },
  { key: "Seven" },
  { key: "Eight" },
  { key: "Nine" },
  { key: "Ten" },
  { key: "Eleven" },
  { key: "Twelve" },
  { key: "Thirteen" },
  { key: "Fourteen" },
  { key: "Fifteen" },
  { key: "Sixteen" },
  { key: "Seventeen" },
  { key: "Eighteen" },
  { key: "Nineteen" },
  { key: "Twenty" }
];

export default class Grid extends React.Component {
  static navigationOptions = {
    title: "Grid"
  };
  getGridViewItem(item) {
    Alert.alert(item);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <TouchableOpacity
              disabled={item.key === "Three" ? true : false}
              onPress={this.getGridViewItem.bind(this, item.key)}
            >
              <View
                style={[
                  styles.itemContainer,
                  {
                    backgroundColor: item.apiName === "" ? "#c7e1d4" : "#8be1b7"
                  }
                ]}
              >
                <Image
                  activeOpacity={50}
                  style={styles.logo}
                  source={require("@images/fitbit-logo.png")}
                />
                <Text style={styles.itemName}>{item.apiName}</Text>
                <Text style={styles.itemCode}>{item.type}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },

  gridViewBlockStyle: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    height: 100,
    margin: 5,
    backgroundColor: "#00BCD4"
  },
  logo: {
    flex: 1,
    alignSelf: "center",
    resizeMode: "contain"
  },
  gridViewInsideTextItemStyle: {
    color: "#fff",
    padding: 10,
    fontSize: 18,
    justifyContent: "center"
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  }
});
