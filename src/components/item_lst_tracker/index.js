import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

export default class ItemTracker extends Component {
  hanldlePress = () => {
    const { item, onClick } = this.props;
    onClick(item);
  };

  render() {
    const { item } = this.props;
    const { logo, provider } = item;

    return (
      <TouchableOpacity onPress={() => this.hanldlePress()} style={styles.flex}>
        <Image
          source={logo}
          style={{
            width: 80,
            height: 80,
            resizeMode: 'contain'
          }}
        />
        <Text style={[styles.black, styles.bold]}>{provider}</Text>
      </TouchableOpacity>
    );
  }
}
