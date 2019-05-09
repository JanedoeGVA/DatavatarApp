import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

export default class ItemMeasure extends Component {
  hanldlePress = () => {
    const { item, onClick } = this.props;
    onClick(item);
  };

  render() {
    const { measure } = this.props;
    const { logo, title } = measure;

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
        <Text style={[styles.black, styles.bold]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
