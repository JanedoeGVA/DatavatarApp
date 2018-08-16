import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default class Folder extends React.Component {
  static navigationOptions = {
    title: 'Folder'
  };

  render() {
    return (
      <View>
        <Text style={styles.container}>
          Folder !!!! lorem asdasdsd asdasdas asdasdas{' '}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40
  }
});
