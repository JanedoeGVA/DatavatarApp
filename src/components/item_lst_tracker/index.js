import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import styles from './styles';

export default class ItemTracker extends Component {
  hanldlePress = () => {
    const { item, onClick } = this.props;
    onClick(item);
  };

  render() {
    const { item } = this.props;
    const { logo, provider } = item.tracker;
    const { avatar } = item;

    return (
      <TouchableOpacity
        onPress={() => this.hanldlePress()}
        style={[styles.flex, { marginTop: 4, marginBottom: 4 }]}
      >
        {console.log(JSON.stringify(item))}
        <Image
          source={logo}
          style={{
            width: 60,
            height: 60,
            resizeMode: 'contain'
          }}
        />
        <Text style={[styles.black, styles.bold, { width: 70, marginLeft: 4 }]}>
          {provider}
        </Text>
        <Image
          source={require('../../assets/images/user.png')}
          style={{
            marginLeft: 10,
            width: 40,
            height: 40,
            resizeMode: 'contain'
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={[styles.bold, { color: '#808080' }]}>User :</Text>
          <Text style={[styles.bold, { color: '#48D1CC' }]}>{avatar}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
