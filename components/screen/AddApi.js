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
import GridView from 'react-native-super-grid';
import {
  updateApi,
  insertApi,
  deleteApi,
  queryAllApi,
  apiExist
} from '@databases/baseSchemas';
import realm from '@databases/baseSchemas';
import Constant from '@utils/Constant';

const apiUrl = `${Constant.BASE_URL}/api/%s/%s`;

const itemsApi = [
  {
    api: 'Fitbit',
    apiName: 'fitbit',
    oauth: 'Oauth2.0',
    image: require('@images/fitbit-logo.png'),
    available: true
  },
  {
    api: 'Garmin',
    apiName: 'garmin',
    oauth: 'Oauth1.A',
    //code: '#9deec7',
    image: require('@images/garmin-logo.png'),
    available: true
  },
  {
    api: 'Nokia Health',
    apiName: 'nokia_health',
    oauth: 'Oauth2.0',
    //code: '#f1c40f',
    image: require('@images/nokia_health-logo.png'),
    available: true
  },
  {
    api: 'My FitnessPal',
    apiName: 'my_fitness%pal',
    oauth: 'Oauth1.A',
    //code: '#f1c40f',
    image: require('@images/myfitnesspal-logo.png'),
    available: false
  }
];

export default class AddApi extends React.Component {
  static navigationOptions = {
    title: 'AddApi'
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

  reloadData = () => {
    function compareApi(apiA, apiB) {
      if (apiA.available == apiB.available) {
        return apiA.apiName.localeCompare(apiB.apiName);
      }
      if (apiB.available) {
        return 1;
      }
      return -1;
    }

    for (let index = 0, size = itemsApi.length; index < size; index++) {
      let api = itemsApi[index];
      apiExist(api.apiName)
        .then(isExist => {
          if (isExist) {
            api.available = false;
          }
          if (index + 1 == size) {
            itemsApi.sort(compareApi);
          }
        })
        .catch(error => {
          console.error(`error : ${error}`);
        });
    }
  };

  authorisation(apiName, authType) {
    var authUrl = vsprintf(apiUrl, [apiName, 'authorisation']);
    console.log('authURL : ' + authUrl);
    fetch(authUrl)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        //store requestTokenSecret if oauth1
        if (authType == 'Oauth1.A') {
          console.log('storing requestTokenSecret : ');
          this._storeData('requestTokenSecret', json['requestTokenSecret']);
        }
        Linking.openURL(json.urlVerification);
      })
      .catch(error => {
        console.error(
          "85. Il y a eu un problème avec l'opération fetch: " + error.message
        );
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
  };

  //A mettre dans une classe externe
  getApiImage = apiName => {
    switch (apiName) {
      case 'fitbit':
        return require('@images/fitbit-logo.png');
      case 'nokia_health':
        return require('@images/nokia_health-logo.png');
      case 'garmin':
        return require('@images/garmin-logo.png');
      case 'my_fitness%pal':
        return require('@images/myfitnesspal-logo.png');
      default:
        return require('@images/add.png');
    }
  };

  render() {
    return (
      <GridView
        itemDimension={130}
        items={itemsApi}
        style={styles.gridView}
        renderItem={item => (
          <TouchableHighlight
            onPress={() =>
              item.available
                ? this.authorisation(item.apiName, item.oauth)
                : alert(`Already in your list`)
            }
          >
            <View
              style={[
                styles.itemContainer,
                {
                  backgroundColor: item.available ? '#8be1b7' : '#c3ddd0',
                  opacity: item.available ? 1 : 0.4
                }
              ]}
            >
              <Image
                activeOpacity={50}
                style={styles.logo}
                source={this.getApiImage(item.apiName)}
              />
              <Text style={styles.itemName}>{item.api}</Text>
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
