import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  TouchableHighlight,
  Platform,
  Alert
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import URI from 'urijs';
import { vsprintf } from 'sprintf-js';
import GridView from 'react-native-super-grid';
import GridComponent from '@components/GridComponent';
import {
  updateApi,
  insertApi,
  deleteApi,
  queryAllApi,
  apiExist
} from '@databases/baseSchemas';
import Constant from '@utils/Constant';

const apiUrl = `${Constant.BASE_URL}/api/%s/%s`;

export default class AddApi extends React.Component {
  static navigationOptions = {
    title: 'AddApi'
  };

  authorisation(apiName, authType) {
    console.log('authorisation call');
    apiExist(apiName).then((exist) => {
      if (!exist) {
        var authUrl = vsprintf(apiUrl, [apiName, 'authorisation']);
        console.log('authURL : ' + authUrl);
        fetch(authUrl)
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            //store requestTokenSecret if oauth1
            console.log(`authType = ${authType}`);
            if (authType == 'Oauth1.A') {
              console.log('storing requestTokenSecret : ');
              this._storeData('requestTokenSecret', json['requestTokenSecret']);
            }
            console.log('linking call');
            Linking.openURL(json.urlVerification);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  verification(url) {
    console.log(`verification`);
    const uri = new URI(url);
    const apiName = uri.host();
    const oauth = uri.segment(0);
    const authUrl = new URI(vsprintf(apiUrl, [apiName, 'verification']));
    if (oauth === 'oauth1') {
      console.log(`oauth1`);
      this._retrieveData('requestTokenSecret')
        .then((reqTokenSecret) => {
          let reqToken = uri.query(true)['oauth_token'];
          let verifier = uri.query(true)['oauth_verifier'];
          authUrl.addQuery('req_token_key', reqToken);
          authUrl.addQuery('req_token_secret', reqTokenSecret);
          authUrl.addQuery('verifier', verifier);
          this.accessToken(authUrl.valueOf());
        })
        .catch((error) => {
          console.error('Promise is rejected with error: ' + error);
        });
    } else {
      console.log(`oauth2`);
      const code = uri.query(true)['code'];
      authUrl.addQuery('code', code);
      console.log(`AuthURL: ${authUrl}`);
      this.accessToken(authUrl.valueOf());
    }
    this._removeData('requestTokenSecret');
  }

  accessToken(authUrl) {
    console.log(`AuthURL: ${authUrl}`);
    fetch(authUrl)
      .then((response) => response.json())
      .then((api) => {
        insertApi(api)
          .then(() => {
            queryAllApi()
              .then((apiLists) => {
                console.log(`all Apilist${apiLists.toString()}`);
              })
              .catch((error) => {
                console.error(`error api list: ${error}`);
              });
            this.props.navigation.navigate('ListApi');
          })
          .catch((error) => {
            console.error(`error : ${error}`);
            alert(`Insert api error ${error}`);
          });
      })
      .catch((error) =>
        console.error(
          "Il y a eu un problème avec l'opération fetch: " + error.message
        )
      );
  }

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`_storeData error : ${error}`);
    }
  };

  _removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`_removeData error : ${error}`);
    }
  };

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.error(`_retrieveData error : ${error}`);
    }
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
    //Linking.removeEventListener("url", this._handleOpenURL);
    this.verification(event.url);
  };

  onPressItem = (item) => {
    console.log(`item.name: ${item.name}`);
    console.log(`item.api: ${item.api}`);
    console.log(`item.auth_method: ${item.auth_method}`);
    return item.available
      ? this.authorisation(item.api, item.auth_method)
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

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 40
  },
  logo: {
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff'
  }
});
