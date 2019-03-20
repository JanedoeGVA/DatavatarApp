import React from 'react';

import { View, Text } from 'react-native';

class Fetch extends React.Component {
  static navigationOptions = {
    title: 'Fetch'
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Fetch </Text>
      </View>
    );
  }
}

export default Fetch;
