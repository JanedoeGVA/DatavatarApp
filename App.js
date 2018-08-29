/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { StyleSheet, Text, View, YellowBox } from "react-native";
import ListApiScreen from "@screen/ListApi";
import SettingsScreen from "@screen/Settings";
import Explorateur from "@screen/Explorateur";
import FolderScreen from "@screen/Folder";
import AddApiScreen from "@screen/AddApi";
import GridScreen from "@screen/Grid";

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Class RCTCxxModule"
]);

const HomeStack = createStackNavigator(
  {
    ListApi: ListApiScreen,
    AddApi: AddApiScreen
  },
  {
    initialRouteName: "ListApi"
  }
);

const Tabs = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Explorateur: { screen: Explorateur },
    Folder: { screen: FolderScreen },
    Settings: { screen: SettingsScreen },
    Grid: { screen: GridScreen }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Home":
            iconName = "ios-home";
            break;
          case "Settings":
            iconName = "ios-list-box";
            break;
          case "Folder":
            iconName = "ios-archive";
            break;
          default:
            iconName = "ios-eye";
            break;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeBackgroundColor: "#DDEBF9",
      style: {
        backgroundColor: "#ffffff"
      },
      activeTintColor: "#38aefa",
      inactiveTintColor: "gray"
    }
  }
);

/*const TabBarIcon = ({ focused, tintColor }) => {
  const { routeName } = navigation.state;
  let iconName;
  switch (routeName) {
    case 'Home':
      iconName = `ios-home${focused ? '' : '-outline'}`;
      break;
    case 'Api':
      iconName = `ios-list-box${focused ? '' : '-outline'}`;
      break;
    case 'Folder':
      iconName = `ios-archive${focused ? '' : '-outline'}`;
      break;
    default:
      iconName = `ios-eye${focused ? '' : '-outline'}`;
      break;
  }
  return <Ionicons name={iconName} size={25} color={tintColor} />;
};*/

/*TabBarIcon.propTypes = {
  focused: PropTypes.bool,
  tintColor: PropTypes.string.isRequired
};*/

/*class App extends Component {
  render() {
    return (
      <View>
        <Text>Welcome to React Native!</Text>
        <Text>To get started, edit App.js</Text>
      </View>
    );
  }
}*/

const App = () => (
  <View style={{ flex: 1 }}>
    <Tabs />
  </View>
);

export default App;
