import { AsyncStorage, Linking } from 'react-native';
import URI from 'urijs';
import { vsprintf } from 'sprintf-js';
import {
  updateApi,
  insertApi,
  deleteApi,
  queryAllApi,
  apiExist
} from '@databases/baseSchemas';
import Constant from '@api/Constant';

const apiUrl = `${Constant.BASE_URL}/api/%s/%s`;

export const authorisation = (apiName, authType) => {
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
};

export const verification = (url) =>
  new Promise((resolve, reject) => {
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
          reject(error);
        });
    } else {
      console.log(`oauth2`);
      const code = uri.query(true)['code'];
      authUrl.addQuery('code', code);
      console.log(`AuthURL: ${authUrl}`);
      this.accessToken(authUrl.valueOf());
    }
    this._removeData('requestTokenSecret');
    resolve();
  }); //insertApi

accessToken = (authUrl) =>
  new Promise((resolve, reject) => {
    console.log(`AuthURL: ${authUrl}`);
    fetch(authUrl)
      .then((response) => response.json())
      .then((api) => {
        insertApi(api)
          .then(() => {
            queryAllApi()
              .then((apiLists) => {
                console.log(`all Apilist${apiLists.toString()}`);
                resolve();
              })
              .catch((error) => {
                console.error(`error api list: ${error}`);
                reject(error);
              });
            //this.props.navigation.navigate('ListApi');
          })
          .catch((error) => {
            console.error(`error : ${error}`);
            alert(`Insert api error ${error}`);
            reject(error);
          });
      })
      .catch((error) => {
        console.error(
          "Il y a eu un problème avec l'opération fetch: " + error.message
        );
        reject(error);
      });
  });

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
