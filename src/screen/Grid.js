import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import GridComponent from '@components/GridComponent';

const itemsApi = [
  {
    api: 'Fitbit',
    apiName: 'fitbit',
    oauth: 'Oauth2.0',
    image: require('@images/fitbit-logo.png'),
    available: true
  },
  {
    api: 'Garmin',
    apiName: 'garmin',
    oauth: 'Oauth1.A',
    //code: '#9deec7',
    image: require('@images/garmin-logo.png'),
    available: true
  },
  {
    api: 'Nokia Health',
    apiName: 'nokia_health',
    oauth: 'Oauth2.0',
    //code: '#f1c40f',
    image: require('@images/nokia_health-logo.png'),
    available: true
  },
  {
    api: 'My FitnessPal',
    apiName: 'my_fitness%pal',
    oauth: 'Oauth1.A',
    //code: '#f1c40f',
    image: require('@images/myfitnesspal-logo.png'),
    available: false
  }
];

export default class Grid extends React.Component {
  onPressItem = (item) => {
    return item.available
      ? alert(`Not in your list`)
      : alert(`Already in your list`);
  };

  setItemColor = (item) => {
    return item.available ? '#8be1b7' : '#c3ddd0';
  };

  render() {
    return (
      <GridComponent
        listApi={itemsApi}
        onPressItem={this.onPressItem}
        setItemColor={this.setItemColor}
      />
    );
  }
}
