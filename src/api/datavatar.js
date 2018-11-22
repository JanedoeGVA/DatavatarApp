import { Linking } from 'react-native';
import * as store from '../store';
import URI from 'urijs';
import { vsprintf } from 'sprintf-js';
import * as Constant from './constant';

//const { removeData, storeData, retrieveData } = store;
const FORMAT_URL = `${Constant.DATAVATAR_BASE_URL}/api/%s/%s`;

export const authorization = (provider, protocol) => {
  console.log('authorization call');
  var authorizationURL = vsprintf(FORMAT_URL, [
    provider.toLowerCase(),
    'authorization'
  ]);
  console.log('authorizationURL : ' + authorizationURL);
  fetch(authorizationURL)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      //store requestTokenSecret if oauth1
      console.log(`authorization protocol = ${protocol}`);
      if (protocol == Constant.OAUTH1) {
        console.log('storing requestTokenSecret : ');
        store.storeData('requestTokenSecret', json['requestTokenSecret']);
      }
      console.log('linking call');
      Linking.openURL(json.urlVerification);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const verification = (url) =>
  new Promise((resolve, reject) => {
    console.log(`verification`);
    const uri = new URI(url);
    const provider = uri.host();
    const protocol = uri.segment(0);
    const verificationURL = new URI(
      vsprintf(FORMAT_URL, [provider, 'verification'])
    );
    if (protocol === Constant.OAUTH1) {
      console.log(`oauth1`);
      store
        .retrieveData('requestTokenSecret')
        .then((requestTokenSecret) => {
          let requestToken = uri.query(true)['oauth_token'];
          let verifier = uri.query(true)['oauth_verifier'];
          verificationURL.addQuery('req_token_key', requestToken);
          verificationURL.addQuery('req_token_secret', requestTokenSecret);
          verificationURL.addQuery('verifier', verifier);
          accessToken(verificationURL.valueOf())
            .then((tracker) => {
              store.removeData('requestTokenSecret');
              resolve(tracker);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          console.error('Promise is rejected with error: ' + error);
          reject(error);
        });
    } else {
      console.log(`oauth2`);
      const code = uri.query(true)['code'];
      verificationURL.addQuery('code', code);
      console.log(`AuthURL: ${verificationURL}`);
      accessToken(verificationURL.valueOf())
        .then((tracker) => {
          resolve(tracker);
        })
        .catch((error) => {
          reject(error);
        });
    }
  }); //insertApi

const accessToken = (verificationURL) =>
  new Promise((resolve, reject) => {
    console.log(`AuthURL: ${verificationURL}`);
    fetch(verificationURL)
      .then((response) => response.json())
      .then((tracker) => {
        console.log(`tracker JSON : ${JSON.stringify(tracker)}`);
        resolve(tracker);
        //TODO modifier nom variable dans le server ?
        //ancien code
        /*insertApi(api)
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
          })
          .catch((error) => {
            console.error(`error : ${error}`);
            alert(`Insert api error ${error}`);
            reject(error);
          });*/
      })
      .catch((error) => {
        console.error(
          "Il y a eu un problème avec l'opération fetch: " + error.message
        );
        reject(error);
      });
  });
