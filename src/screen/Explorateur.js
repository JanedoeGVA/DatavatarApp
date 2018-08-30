import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default class Explorateur extends React.Component {
  static navigationOptions = {
    title: 'Explorateur'
  };

  render() {
    const { apiName, accessTokenKey } = this.props.navigation.state.params;
    return (
      <View>
        <Text style={styles.container}>{`API name :'${apiName}`}</Text>
        <Text style={styles.container}>{`API token : '${accessTokenKey}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40
  }
});
