import React from 'react';

import { View, Text } from 'react-native';

class Storage extends React.Component {
  static navigationOptions = {
    title: 'Storage'
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Storage </Text>
      </View>
    );
  }
}

export default Storage;
