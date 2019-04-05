import { Linking } from 'react-native';
import URI from 'urijs';
import { vsprintf } from 'sprintf-js';
import { ADD_TRACKER, Token } from './activity_tracker';
import * as store from '../store';
import * as Constant from './constant';
import { formatDate } from './date';

// const { removeData, storeData, retrieveData } = store;
// const FORMAT_URL = `${Constant.DATAVATAR_BASE_URL}/${
//   Constant.URL_PATH_API
// }/%s/%s`;

export const getData = (actTracker, date, endDate) =>
  new Promise((resolve, reject) => {
    // const { update } = this.props;
    const url = `https://datavatar.sytes.net/api/${actTracker.provider.toLowerCase()}/protecteddata/hearthrate?date=${date}&end-date=${endDate}`;
    console.log(`actTracker ${JSON.stringify(actTracker)}`);
    console.log(`accessToken ${JSON.stringify(actTracker.token.accessToken)}`);
    console.log(url);
    const { accessToken } = actTracker.token;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        assertion: accessToken
      }
    })
      .then((response) => {
        const code = response.status;
        response
          .json()
          .then((json) => {
            if (code === 401) {
              resolve({ tokenNotValid: true });
            } else {
              resolve(json);
            }
          })
          .catch((error) => reject(error));
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

export const refresh = (provider, refreshToken) =>
  new Promise((resolve, reject) => {
    // let token;
    const uri = new URI(Constant.DATAVATAR_BASE_URL);
    uri.segment([
      Constant.URL_PATH_API,
      provider.toLowerCase(),
      Constant.URL_PATH_REFRESH
    ]);
    fetch(uri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        assertion: refreshToken
      }
    })
      .then((response) => {
        const code = response.status;
        console.log(`Response refresh code : ${JSON.stringify(code)}`);
        if (code === 200) {
          response
            .json()
            .then((json) => {
              console.log(`Response JSON : ${JSON.stringify(json)}`);
              resolve(json);
            })
            .catch((error) => reject(error));
        } else {
          const token = null;
          console.log('Invalid Token, plz subscribe');
          resolve(token);
        }
      })
      .catch((error) => reject(error));
  });

export const authorization = (provider, protocol) => {
  console.log('authorization call');
  const uri = new URI(Constant.DATAVATAR_BASE_URL);
  uri.segment([
    Constant.URL_PATH_API,
    provider.toLowerCase(),
    Constant.URL_PATH_AUTORIZATION
  ]);
  // const authorizationURL = vsprintf(FORMAT_URL, [
  //   provider.toLowerCase(),
  //   'authorization'
  // ]);
  // console.log(`authorizationURL : ${authorizationURL}`);
  fetch(uri)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // store requestTokenSecret if oauth1
      console.log(`authorization protocol = ${protocol}`);
      if (protocol === Constant.OAUTH1) {
        console.log('storing requestTokenSecret : ');
        store.saveData('requestTokenSecret', json.requestTokenSecret);
      }
      console.log('linking call');
      Linking.openURL(json.urlVerification);
    })
    .catch((error) => {
      console.error(error);
    });
};

const accessToken = (verificationURL) =>
  new Promise((resolve, reject) => {
    console.log(`AuthURL: ${verificationURL}`);
    fetch(verificationURL)
      .then((response) => response.json())
      .then((tracker) => {
        console.log(`tracker JSON : ${JSON.stringify(tracker)}`);
        resolve(tracker);
        // TODO modifier nom variable dans le server ?
      })
      .catch((error) => {
        console.error(
          `Il y a eu un problème avec l'opération fetch: ${error.message}`
        );
        reject(error);
      });
  });

export const verification = (url) =>
  new Promise((resolve, reject) => {
    console.log(`@datavatar verification(url) call`);
    const uri = new URI(url);
    const provider = uri.host();
    const protocol = uri.segment(0);
    const uriVerification = new URI(Constant.DATAVATAR_BASE_URL);
    uriVerification.segment([
      Constant.URL_PATH_API,
      provider,
      Constant.URL_PATH_VERIFICATION
    ]);
    if (protocol === Constant.OAUTH1) {
      console.log(`@datavatar verification(url) type oauth1`);
      store
        .retrieveData('requestTokenSecret')
        .then((requestTokenSecret) => {
          const requestToken = uri.query(true).oauth_token;
          const verifier = uri.query(true).oauth_verifier;
          uriVerification.addQuery('req_token_key', requestToken);
          uriVerification.addQuery('req_token_secret', requestTokenSecret);
          uriVerification.addQuery('verifier', verifier);
          accessToken(uriVerification)
            .then((tracker) => {
              store.removeData('requestTokenSecret');
              resolve(tracker);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          console.error(`Promise is rejected with error: ${error}`);
          reject(error);
        });
    } else {
      console.log(`oauth2`);
      const { code } = uri.query(true);
      uriVerification.addQuery('code', code);
      console.log(`AuthURL: ${uriVerification}`);
      accessToken(uriVerification)
        .then((tracker) => {
          resolve(tracker);
        })
        .catch((error) => {
          reject(error);
        });
    }
  }); // insertApi
