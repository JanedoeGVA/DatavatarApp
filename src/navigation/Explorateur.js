import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

export default class Explorateur extends React.Component {
  static navigationOptions = {
    title: 'Explorateur'
  };

  //not working
  static defaultProps = {
    apiName: '',
    accessTokenKey: ''
  };

  render() {
    if (this.props.navigation.state.params) {
      const { apiName, accessTokenKey } = this.props.navigation.state.params;
      return (
        <View>
          <Text style={styles.container}>{`API name :'${apiName}`}</Text>
          <Text
            style={styles.container}
          >{`API token : '${accessTokenKey}`}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.middle}>
          <Text>{'No DATA !!!'}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingLeft: 20
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
