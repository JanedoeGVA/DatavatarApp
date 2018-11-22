import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { View } from 'react-native';
import ProvidersScreen from '../../features/home/containers';
import SettingsScreen from '../../features/subscribe/containers';
import ExplorateurScreen from '../../features/subscribe/containers';
import FolderScreen from '../../features/subscribe/containers';
import SubscribeScreen from '../../features/subscribe/containers';
import GridScreen from '../../features/subscribe/containers';

const HomeStack = createStackNavigator(
  {
    Providers: ProvidersScreen,
    Subscribe: SubscribeScreen
  },
  {
    initialRouteName: 'Providers'
  }
);

const Tabs = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Explorateur: { screen: ExplorateurScreen },
    Folder: { screen: FolderScreen },
    Settings: { screen: SettingsScreen },
    Grid: { screen: GridScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = 'ios-home';
            break;
          case 'Settings':
            iconName = 'ios-list-box';
            break;
          case 'Folder':
            iconName = 'ios-archive';
            break;
          default:
            iconName = 'ios-eye';
            break;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeBackgroundColor: '#DDEBF9',
      style: {
        backgroundColor: '#ffffff'
      },
      activeTintColor: '#38aefa',
      inactiveTintColor: 'gray'
    }
  }
);

const MainNavigator = createAppContainer(Tabs);

export default MainNavigator;
