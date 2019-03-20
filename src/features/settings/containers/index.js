import React from 'react';

import { View, Text } from 'react-native';

class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Settings </Text>
      </View>
    );
  }
}

export default Settings;
