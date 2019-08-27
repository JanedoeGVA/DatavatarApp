import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import styles from './styles';

export default class ItemHeartRate extends Component {
  handlePress = () => {
    const { heartRate, onClick } = this.props;
    onClick(heartRate);
  };

  render() {
    const { heartRate } = this.props;
    return (
      <TouchableOpacity onPress={() => this.handlePress()} style={styles.flex}>
        <Image
          source={require('../../assets/images/hr.png')}
          style={{
            width: 50,
            height: 50,
            resizeMode: 'contain'
          }}
        />
        <View style={{ marginLeft: 8 }}>
          <Text style={[styles.blue, styles.bold]}>{heartRate['start']}</Text>
          <Text style={[styles.blue, styles.bold]}>{heartRate['end']}</Text>
        </View>
        <Text style={[{ marginLeft: 8 }, styles.black, styles.bold]}>
          {' Mean :  '}
          <Text style={[styles.black, styles.bold]}>
            {' '}
            {heartRate['average']} bpm
          </Text>
        </Text>
      </TouchableOpacity>
    );
  }
}
