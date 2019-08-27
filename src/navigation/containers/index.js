import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import SubscribedListScreen from '../../features/fetch/containers/list_subscribed';
import RequestDataListScreen from '../../features/fetch/containers/list_request_data';
import ProvidersScreen from '../../features/home/containers';
import SettingsScreen from '../../features/settings/containers';
import SubscribeScreen from '../../features/subscribe/containers';
import FetchScreen from '../../features/fetch/containers';
import StorageScreen from '../../features/storage/containers';
import TestScreen from '../../features/fetch/containers/test';
import GraphScreen from '../../features/fetch/containers/graph';

const HomeStack = createStackNavigator(
  {
    Providers: ProvidersScreen,
    Subscribe: SubscribeScreen
  },
  {
    initialRouteName: 'Providers'
  }
);

const FetchStack = createStackNavigator(
  {
    Subscribed: SubscribedListScreen,
    RequestData: RequestDataListScreen,
    Fetch: FetchScreen,
    Test: TestScreen,
    Graph: GraphScreen
  },
  {
    initialRouteName: 'Subscribed'
  }
);

const Tabs = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Fetching: { screen: FetchStack },
    Storage: { screen: StorageScreen },
    Settings: { screen: SettingsScreen }
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
            iconName = 'ios-cog';
            break;
          case 'Fetching':
            iconName = 'ios-cloud-download';
            break;
          case 'Storage':
            iconName = 'ios-archive';
            break;
          default:
            iconName = 'ios-help-circle-outline';
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
