import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default class Folder extends React.Component {
  static navigationOptions = {
    title: 'Folder'
  };

  render() {
    return (
      <View style={styles.middle}>
        <Text>Folder</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
