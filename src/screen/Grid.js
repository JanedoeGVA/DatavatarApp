import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import GridComponent from '@components/GridComponent';
import { listApi } from '@utils/Constant';

export default class Grid extends React.Component {
  onPressItem = (item) => {
    return item.available
      ? alert(`Already in your list`)
      : alert(`Not in your list`);
  };

  setItemColor = (item) => {
    return item.available ? '#8be1b7' : '#c3ddd0';
  };

  render() {
    return (
      <GridComponent
        onPressItem={this.onPressItem}
        setItemColor={this.setItemColor}
      />
    );
  }
}
