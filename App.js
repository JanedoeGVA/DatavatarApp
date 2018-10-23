/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import DB from './bd/db';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList
} from 'react-native';

const car = {
  make: 'Ford',
  model: 'Fiesta',
  miles: 1000
};

export default class App extends Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      value: 'nothing',
      dataSource: []
    };
    DB.insert('Car', car)
      .then((items) => {
        alert(`nb item: ${items.length}`);
        this.refresh(items);
      })
      .catch((error) => {
        alert(error);
      });
  }

  insert = () => {
    console.log('insert');
  };

  refresh = (items) => {
    this.setState({ value: items.length });
    this.setState({ dataSource: items });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            this.insert();
          }}
          title="insert"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text style={styles.instructions}>{this.state.value}</Text>
        <FlatList
          data={this.state.dataSource}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.flatview}>
              <Text>{item.make}</Text>
              <Text>{item.model}</Text>
            </View>
          )}
          keyExtractor={(item) => item.models}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold'
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  text: {
    marginLeft: 12,
    fontSize: 16
  }
});
