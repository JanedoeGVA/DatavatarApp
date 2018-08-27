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
import URI from 'urijs';
import { vsprintf } from 'sprintf-js';
import Constant from '@utils/Constant';
import GridView from 'react-native-super-grid';
import {
  updateApi,
  insertApi,
  deleteApi,
  queryAllApi,
  apiExist
} from '@databases/baseSchemas';
import realm from '@databases/baseSchemas';

//const apiUrl = `${Constant.BASE_URL}/api/%s/%s`;

const addApi = {
  id: -1,
  apiName: '',
  isValide: 'true',
  type: 'Add an API',
  accessTokenKey: '',
  refreshTokenKey: '',
  accessTokenSecret: ''
};

/*const fitbit = {
  api: 'Fitbit',
  apiName: 'fitbit',
  oauth: 'Oauth2.0',
  //code: '#9deec7',
  image: require('@images/fitbit-logo.png')
};*/

export default class ListApi extends React.Component {
  static navigationOptions = {
    title: 'Health & Wellness partener'
  };

  constructor(props) {
    super(props);
    this.state = {
      apiLists: []
    };
    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
  }
  /*
  authorisation(apiName, authType) {
    apiExist(apiName)
      .then(exist => {
        if (!exist) {
          var authUrl = vsprintf(apiUrl, [apiName, 'authorisation']);
          console.log('authURL : ' + authUrl);
          fetch(authUrl)
            .then(response => response.json())
            .then(json => {
              console.log(json);
              //store requestTokenSecret if oauth1
              if (authType == 'Oauth1.A') {
                console.log('storing requestTokenSecret : ');
                this._storeData(
                  'requestTokenSecret',
                  json['requestTokenSecret']
                );
              }
              Linking.openURL(json.urlVerification);
            })
            .catch(error => {
              console.log(
                "85. Il y a eu un problème avec l'opération fetch: " +
                  error.message
              );
            });
        } else {
          console.log('api exist');
          Alert.alert(
            'API already exist',
            'Please remove it from your list before',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        }
      })
      .catch(error => {
        console.log(`error : ${error}`);
      });
  }

  verification(url) {
    const uri = new URI(url);
    const apiName = uri.host();
    const oauth = uri.segment(0);
    const authUrl = new URI(vsprintf(apiUrl, [apiName, 'verification']));
    if (oauth === 'oauth1') {
      this._retrieveData('requestTokenSecret')
        .then(reqTokenSecret => {
          let reqToken = uri.query(true)['oauth_token'];
          let verifier = uri.query(true)['oauth_verifier'];
          authUrl.addQuery('req_token_key', reqToken);
          authUrl.addQuery('req_token_secret', reqTokenSecret);
          authUrl.addQuery('verifier', verifier);
          this.accessToken(authUrl.valueOf());
        })
        .catch(error => {
          console.error('Promise is rejected with error: ' + error);
        });
    } else {
      const code = uri.query(true)['code'];
      authUrl.addQuery('code', code);
      this.accessToken(authUrl.valueOf());
    }
    this._removeData('requestTokenSecret');
  }

  accessToken(authUrl) {
    fetch(authUrl)
      .then(response => response.json())
      .then(api => {
        insertApi(api)
          .then(
            queryAllApi()
              .then(apiLists => {
                console.log(`all Api${apiLists.toString()}`);
              })
              .catch(error => {
                console.error(`error : ${error}`);
              })
          )
          .catch(error => {
            console.error(`error : ${error}`);
            alert(`Insert api error ${error}`);
          });
      })
      .catch(error =>
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

  _removeData = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`_removeData error : ${error}`);
    }
  };

  _retrieveData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.error(`_retrieveData error : ${error}`);
    }
  };

  componentDidMount() {
    console.log('componentDidMount called');
    if (Platform.OS === 'android') {
      Linking.getInitialURL()
        .then(url => {
          if (url) {
            this.verification(url);
          }
        })
        .catch(err => console.error('An error occurred', err));
    } else {
      Linking.addEventListener('url', this._handleOpenURL);
    }
  }

  componentWillMount() {
    console.log('componentWillMount called');
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL = event => {
    this.verification(event.url);
  };*/

  //A mettre dans une classe externe
  getApiImage = apiName => {
    switch (apiName) {
      case 'fitbit':
        return require('@images/fitbit-logo.png');
      case 'nokia_health':
        return require('@images/nokia_health-logo.png');
      case 'garmin':
        return require('@images/garmin-logo.png');
      default:
        return require('@images/add.png');
    }
  };

  reloadData = () => {
    queryAllApi()
      .then(apiLists => {
        //let arr = Object.values(apiLists); /**/ !!!ES7 functions seems works only on debug mod */
        let arr = Object.keys(apiLists).map(key => apiLists[key]);
        arr.push(addApi);
        this.setState({ apiLists: arr });
      })
      .catch(error => {
        this.setState({ apiLists: [] });
      });
  };

  addApi = () => {
    console.log(`add api`);
    this.props.navigation.navigate('AddApi');
  };

  loadApi = api => {
    this.props.navigation.navigate('Explorateur', { ...api });
    console.log(`load api : ${api.apiName}`);
  };

  render() {
    return (
      <GridView
        itemDimension={130}
        items={this.state.apiLists}
        style={styles.gridView}
        renderItem={item => (
          <TouchableHighlight
            onPress={() =>
              item.apiName === '' ? this.addApi() : this.loadApi(item)
            }
          >
            <View
              style={[
                styles.itemContainer,
                {
                  backgroundColor: item.apiName === '' ? '#c7e1d4' : '#8be1b7'
                }
              ]}
            >
              <Image
                activeOpacity={50}
                style={styles.logo}
                source={this.getApiImage(item.apiName)}
              />
              <Text style={styles.itemName}>{item.apiName}</Text>
              <Text style={styles.itemCode}>{item.type}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 40,
    flex: 1
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
