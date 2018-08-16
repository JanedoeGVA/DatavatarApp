import React from 'react';
import { View, Text } from 'react-native';

export default class AddApi extends React.Component {
  static navigationOptions = {
    title: 'AddApi'
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Add Api</Text>
      </View>
    );
  }
}
