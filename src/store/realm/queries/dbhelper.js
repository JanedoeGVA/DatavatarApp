import Realm from 'realm';
import DB from './db';
import {
  TBL_TRACKER_SCHEMA,
  TBL_SUBSCRIBED_SCHEMA,
  TBL_TOKEN_SCHEMA,
  config
} from '../models/tracker';
import { SubscribedTracker, Token } from '../../../api/activity_tracker/index';

const db = new DB(config, Realm);

/**
 * - Check if Realm is Empty
 * @return {Boolean}
 */
export const isEmpty = () =>
  new Promise((resolve, reject) => {
    db.isEmpty()
      .then((empty) => {
        resolve(empty);
      })
      .catch((error) => {
        reject(error);
      });
  });

/**
 * /**
 * @typedef {import('../../../api/activity_tracker/index').Tracker} Tracker
 * - Add a list of Tracker in Realm, used at the first launch for init Trackers list
 * @param {Array<Tracker>} lstActTracker
 */
export const addListTracker = (lstActTracker) =>
  new Promise((resolve, reject) => {
    db.insertCollection(TBL_TRACKER_SCHEMA, lstActTracker)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

/**
 * - Return the subscribed tracker after is adding in the Realm
 * @param {String} avatar
 * -The avatar of the account set by the user
 * @param {String} provider
 * -The provider name of the Tracker
 * @param {String} accessToken
 * -The token key generate by the authorisation tracker
 * @param {String} secret
 * -The secret token if OAuth1
 *  @param {String} refresh
 * -The refresh token if OAuth2
 * @return {Promise.<SubscribedTracker>}
 */
export const addSubscribed = (avatar, provider, accessToken, secret, refresh) =>
  new Promise((resolve, reject) => {
    db.getNextID(TBL_SUBSCRIBED_SCHEMA)
      .then((id) => {
        db.query(TBL_TRACKER_SCHEMA, `provider == "${provider}"`)
          .then((trackers) => {
            const token = new Token({
              id: id,
              accessToken: accessToken,
              secret: secret,
              refreshToken: refresh
            });
            const tracker = trackers[0];
            const subscribed = new SubscribedTracker(
              id,
              avatar,
              tracker,
              token
            );
            console.log(
              `@db addActTracker : actTracker = ${JSON.stringify(subscribed)}`
            );
            db.insert(TBL_SUBSCRIBED_SCHEMA, subscribed)
              .then(() => {
                resolve(subscribed);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });

/**
 * - Return all the trackers
 * @param {SubscribedTracker} subscribed
 * -The schema name where we want to query in the Realm config
 * @return {Promise.<Array<Tracker>>}
 */
export const getLstTracker = () =>
  new Promise((resolve, reject) => {
    db.query(TBL_TRACKER_SCHEMA)
      .then((realmResults) => {
        const lstTrackers = Object.keys(realmResults).map(
          (key) => realmResults[key]
        );
        resolve(lstTrackers);
      })
      .catch((error) => {
        reject(error);
      });
  });

/**
 * - Return all the trackers subscribed
 * @return {Promise.<Array<SubscribedTracker>>}
 */
export const getAllSubscribed = () =>
  new Promise((resolve, reject) => {
    db.query(TBL_SUBSCRIBED_SCHEMA)
      .then((realmResults) => {
        const lstSubscribed = Object.keys(realmResults).map(
          (key) => realmResults[key]
        );
        resolve(lstSubscribed);
      })
      .catch((error) => {
        reject(error);
      });
  });

/**
 * - Return the tracker subscribed corresponding to the ID
 * @param {number} id
 * @return {Promise.<SubscribedTracker>}
 */
export const getSubscribed = (id) =>
  new Promise((resolve, reject) => {
    db.query(TBL_SUBSCRIBED_SCHEMA, `id == "${id}"`)
      .then((realmResults) => {
        const lstSubscribed = Object.keys(realmResults).map(
          (key) => realmResults[key]
        );
        resolve(lstSubscribed[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
/**
 * - Remove a Subscribed Tracker and the token
 * @param {import('../../../api/activity_tracker').SubscribedTracker} subscribed
 * @return {Promise<>}
 */
export const removeSubscribed = (subscribed) =>
  new Promise((resolve, reject) => {
    console.log('dbhelper removeSubscribed call');
    db.remove(TBL_TOKEN_SCHEMA, subscribed.token)
      .then(() => {
        db.remove(TBL_SUBSCRIBED_SCHEMA, subscribed)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });

/**
 * - Remove all Subscribed Trackers
 * @return {Promise<null>}
 */
export const removeAllSubscribed = () =>
  new Promise((resolve, reject) => {
    db.remove(TBL_SUBSCRIBED_SCHEMA)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

/**
 * - Update token
 * @param {import('../../../api/activity_tracker').Token} token
 * @return {Promise<SubscribedTracker>}
 */
export const updateToken = (token) =>
  new Promise((resolve, reject) => {
    db.update(TBL_TOKEN_SCHEMA, token)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

//   /**
//  * - add aSubscribed
//  * @param {SubscribedTracker} subscribed
//  * @param {string} refreshToken
//  * @return {Promise<SubscribedTracker>}
//  */
// export const addSubscribed = (subscribed) =>
//   new Promise((resolve, reject) => {
//     updateRegisterToken(subscribed, tracker.token, false)
//       .then((actTracker) => {
//         resolve(actTracker);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });

/**
 * - Check if a Tracker already exist
 * @param {Tracker} tracker
 * @return {Promise.<boolean>}
 */
export const isExist = (tracker) =>
  new Promise((resolve, reject) => {
    db.query(TBL_TRACKER_SCHEMA, `provider == "${tracker.provider}"`)
      .then((lstTracker) => {
        resolve(lstTracker.length !== 0);
      })
      .catch((error) => {
        reject(error);
      });
  });
