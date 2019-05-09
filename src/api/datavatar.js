import { Linking } from 'react-native';
import URI from 'urijs';
import { vsprintf } from 'sprintf-js';
import base64 from 'react-native-base64';
import { ADD_TRACKER, Token } from './activity_tracker';
import * as store from '../store';
import * as Constant from './constant';
import { formatDate } from './date';
import * as Status from './http_status';

export const revoke = (actTracker) =>
  new Promise((resolve, reject) => {
    const { accessToken } = actTracker.token;
    const { provider } = actTracker.provider;
    const authHeader = `Bearer ${accessToken}`;
    const uri = new URI(Constant.DATAVATAR_BASE_URL);
    uri.segment([
      Constant.URL_PATH_API,
      provider.toLowerCase(),
      Constant.URL_PATH_REVOKE
    ]);
    fetch(uri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authHeader
      }
    })
      .then((response) => {
        console.log(`response ${JSON.stringify(response)}`);
        const code = response.status;
        console.log(`code ${JSON.stringify(code)}`);
        if (code === Status.OK.statusCode) {
          // token a bien ete supprimé
          resolve();
        } else if (code === Status.SEE_OTHER.statusCode) {
          // api n'a pas implemente de fonction revoke, il faut aller sur la page web
          resolve({ redirect: response.headers.Location });
        } else {
          // il y a eu un probleme
          throw response.body;
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });

export const getData = (actTracker, date, endDate) =>
  new Promise((resolve, reject) => {
    // const { update } = this.props;

    console.log(`actTracker ${JSON.stringify(actTracker)}`);
    console.log(`accessToken ${JSON.stringify(actTracker.token.accessToken)}`);

    const { accessToken } = actTracker.token;
    const { provider } = actTracker.provider;
    let authHeader;
    if (actTracker.protocol === Constant.OAUTH2) {
      authHeader = `Bearer ${accessToken}`;
    } else {
      const oauth1Token = {
        accessToken,
        secret: actTracker.token.secret
      };
      console.log(accessToken);
      console.log(actTracker.token.secret);
      console.log(JSON.stringify(oauth1Token));
      authHeader = `Bearer ${base64.encode(JSON.stringify(oauth1Token))}`;
    }
    console.log(`authHeader ${authHeader}`);
    const uri = new URI(Constant.DATAVATAR_BASE_URL);
    uri.segment([
      Constant.URL_PATH_API,
      provider.toLowerCase(),
      'protecteddata',
      'heart-rate'
    ]);
    uri.addSearch('date', date);
    uri.addSearch('end-date', endDate);
    fetch(uri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authHeader
      }
    })
      .then((response) => {
        console.log(`response ${JSON.stringify(response)}`);
        const code = response.status;
        console.log(`code ${JSON.stringify(code)}`);
        if (code === 200) {
          response.json().then((json) => {
            console.log(`json ${JSON.stringify(json)}`);
            resolve({ data: json });
          });
        } else if (code === 401) {
          resolve({ tokenNotValid: true });
        } else {
          resolve({ error: response.body });
        }
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
    const authHeader = `Bearer ${refreshToken}`;
    fetch(uri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authHeader
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
      let urlVerification;
      if (json.provider === 'Fitbit') {
        urlVerification = new URI(json.urlVerification)
          .addSearch('prompt', 'login consent')
          .toString();
      } else if (json.provider === 'Strava') {
        urlVerification = new URI(json.urlVerification)
          .addSearch('approval_prompt', 'force')
          .toString();
      } else {
        urlVerification = json.urlVerification;
      }
      console.log(`linking call ${JSON.stringify(urlVerification)}`);
      Linking.openURL(urlVerification);
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
