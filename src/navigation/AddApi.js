import React from 'react';
import { View, Linking } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import GridComponent from '@components/GridComponent';
import { authorisation, verification } from '@api/Oauth';
import {
  updateApi,
  insertApi,
  deleteApi,
  queryAllApi,
  apiExist
} from '@databases/baseSchemas';

export default class AddApi extends React.Component {
  static navigationOptions = {
    title: 'AddApi'
  };

  didFocus(payload) {
    console.log('did focus', payload);
    Linking.addEventListener('url', this._handleOpenURL);
  }

  willFocus(payload) {
    console.log('will focus', payload);
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  willBlur(payload) {
    console.log('will blur', payload);
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL = (event) => {
    console.log('_handleOpenURL call vérification');
    verification(event.url)
      .then(() => {
        this.props.navigation.navigate('ListApi');
      })
      .catch((error) => {
        console.error('Promise is rejected with error: ' + error);
      });
  };

  onPressItem = (item) => {
    console.log(`item.name: ${item.name}`);
    console.log(`item.api: ${item.api}`);
    console.log(`item.auth_method: ${item.auth_method}`);
    return item.available
      ? authorisation(item.api, item.auth_method)
      : alert(`Already in your list`);
  };

  setItemColor = (item) => {
    return item.available ? '#8be1b7' : '#c3ddd0';
  };

  render() {
    return (
      <View>
        <NavigationEvents
          onWillFocus={(payload) => this.willFocus(payload)}
          onDidFocus={(payload) => this.didFocus(payload)}
          onWillBlur={(payload) => this.willBlur(payload)}
          onDidBlur={(payload) => console.log('did blur', payload)}
        />
        <GridComponent
          onPressItem={this.onPressItem}
          setItemColor={this.setItemColor}
        />
      </View>
    );
  }
}
