/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import DBHelper from './bd/dbhelper';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList
} from 'react-native';

const api = {
  id: 2,
  apiName: 'Strava',
  isValide: true,
  type: 'OAUTH2',
  accessTokenKey: 'aadasd425252'
};

const apiUn = {
  apiName: 'Nike',
  isValide: true,
  type: 'OAUTH2',
  accessTokenKey: 'aadasd425252'
};

const apiUpdate = {
  id: 2,
  apiName: 'fitbit',
  isValide: true,
  type: 'OAUTH1',
  accessTokenKey: 'aadasd425252'
};

export default class App extends Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      value: 'nothing',
      dataSource: []
    };
    this._refresh();
  }

  _update = () => {
    DBHelper.updateActTracker(apiUpdate)
      .then(() => {
        this._refresh();
      })
      .catch((error) => {
        alert(error);
      });
  };

  _removeAll = () => {
    DBHelper.removeAllActTracker()
      .then(() => {
        this._refresh();
      })
      .catch((error) => {
        alert(error);
      });
  };
  _remove = () => {
    DBHelper.removeActTracker(api)
      .then(() => {
        this._refresh();
      })
      .catch((error) => {
        alert(error);
      });
  };

  _insert = () => {
    DBHelper.addActTracker(apiUn)
      .then(() => {
        this._refresh();
      })
      .catch((error) => {
        alert(error);
      });
  };

  _refresh = () => {
    DBHelper.getLstActTracker()
      .then((lstActTracker) => {
        this.setState({ value: lstActTracker.length });
        this.setState({ dataSource: lstActTracker });
      })
      .catch((error) => {
        alert(`error refresh ${error}`);
      });
  };

  _exist = () => {
    DBHelper.isExist(apiUpdate)
      .then((isExist) => {
        if (isExist) {
          console.log('exist');
        } else {
          console.log('exist pas ');
        }
      })
      .catch((error) => {
        alert(`error refresh ${error}`);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            this._insert();
          }}
          title="insert"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => {
            this._removeAll();
          }}
          title="remove"
          color="#841584"
        />
        <Button
          onPress={() => {
            this._update();
          }}
          title="update"
          color="#841584"
        />
        <Button
          onPress={() => {
            this._exist();
          }}
          title="exist"
          color="#841584"
        />
        <Text style={styles.instructions}>{this.state.value}</Text>
        <FlatList
          data={this.state.dataSource}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.flatview}>
              <Text>{item.id}</Text>
              <Text>{item.apiName}</Text>
              <Text>{item.type}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
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
