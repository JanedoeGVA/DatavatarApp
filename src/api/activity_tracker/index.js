import { tokenType, trackerType, subscribedTrackerType } from './type';
import * as Constant from '../constant';
import * as store from '../../store';

const FITBIT_LOGO = require('../../assets/images/fitbit-logo.png');
const GARMIN_LOGO = require('../../assets/images/garmin-logo.png');
const WITHINGS_LOGO = require('../../assets/images/withings-logo.png');
const STRAVA_LOGO = require('../../assets/images/strava-logo.png');
const ADD_LOGO = require('../../assets/images/add.png');

// const getLogo = (provider) => {
//   switch (provider) {
//     case Constant.FITBIT_PROVIDER:
//       return FITBIT_LOGO;
//     case Constant.GARMIN_PROVIDER:
//       return GARMIN_LOGO;
//     case Constant.STRAVA_PROVIDER:
//       return STRAVA_LOGO;
//     case Constant.WITHINGS_PROVIDER:
//       return WITHINGS_LOGO;
//     default:
//       return ADD_LOGO;
//   }
// };

export class Token {
  constructor({ id, accessToken = null, secret = null, refreshToken = null }) {
    this.id = id;
    this.accessToken = accessToken;
    this.secret = secret;
    this.refreshToken = refreshToken;
  }
}
Token.propTypes = tokenType.isRequired;

export class SubscribedTracker {
  constructor(id, avatar, tracker) {
    this.id = id;
    this.tracker = tracker;
    this.avatar = avatar;
    this.token = new Token({ id });
  }
}
SubscribedTracker.propTypes = subscribedTrackerType;

export class Tracker {
  constructor(id, provider, protocol, logo) {
    this.id = id;
    this.provider = provider;
    this.protocol = protocol;
    this.logo = logo;
  }
}
Tracker.propTypes = trackerType;

// const tokenType = PropTypes.shape({
//   id: PropTypes.number.isRequired,
//   accessToken: PropTypes.string,
//   secret: PropTypes.string,
//   refreshToken: PropTypes.string
// });

// const trackerType = PropTypes.shape({
//   provider: PropTypes.string.isRequired,
//   protocol: PropTypes.string.isRequired,
//   logo: PropTypes.number.isRequired
// });

// ActivityTracker.propTypes = {
//   id: PropTypes.number.isRequired,
//   avatar: PropTypes.string.isRequired,
//   tracker: trackerType.isRequired,
//   token: tokenType.isRequired
// };

const FITBIT_TRACKER = new Tracker(
  Constant.FITBIT_ID,
  Constant.FITBIT_PROVIDER,
  Constant.OAUTH2,
  FITBIT_LOGO
);

const GARMIN_TRACKER = new Tracker(
  Constant.GARMIN_ID,
  Constant.GARMIN_PROVIDER,
  Constant.OAUTH1,
  GARMIN_LOGO
);

const WITHINGS_TRACKER = new Tracker(
  Constant.WITHINGS_ID,
  Constant.WITHINGS_PROVIDER,
  Constant.OAUTH2,
  WITHINGS_LOGO
);

const STRAVA_TRACKER = new Tracker(
  Constant.STRAVA_ID,
  Constant.STRAVA_PROVIDER,
  Constant.OAUTH2,
  STRAVA_LOGO
);

export const ADD_TRACKER = new Tracker(
  Constant.ADD_ID,
  Constant.ADD_PROVIDER,
  Constant.SUBSCRIBE,
  ADD_LOGO
);

export const lstTrackers = [
  FITBIT_TRACKER,
  GARMIN_TRACKER,
  STRAVA_TRACKER,
  WITHINGS_TRACKER
];

// const getLstActTrackerSubscribedUnsafe = () =>
//   new Promise((resolve, reject) => {
//     console.log(`getLstActTrackerSubscribedUnsafe`);
//     store
//       .getLstActTrackerSubscribed()
//       .then((dbList) => {
//         console.log(`dblist : ${dbList}`);
//         const dbArray = Object.keys(dbList).map((key) => dbList[key]);
//         resolve(dbArray);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });

export const loadIfDBEmpty = () =>
  new Promise((resolve, reject) => {
    console.log(`loadIfDBEmpty`);
    store
      .isEmpty()
      .then((empty) => {
        if (empty) {
          console.log(`db empty`);
          store
            .addListTracker(lstTrackers)
            .then(() => resolve())
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve();
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

/**
 * - Return an array of the Subscribed Tracker
 * @return {Promise.<Array<SubscribedTracker>}
 */
export const getSubscribed = () =>
  new Promise((resolve, reject) => {
    console.log(`getSubscribed`);
    store
      .getAllSubscribed()
      .then((allSubscribed) => {
        console.log(`dblist : ${allSubscribed}`);
        // const dbArray = Object.keys(dbList).map((key) => dbList[key]);
        resolve(allSubscribed);
      })
      .catch((error) => {
        reject(error);
      });
  });

/**
 * - Return an array of the Trackers
 * @return {Promise.<Array<SubscribedTracker>}
 */
export const getTrackers = () =>
  new Promise((resolve, reject) => {
    store
      .getLstTracker()
      .then((trackers) => {
        // const dbArray = Object.keys(dbList).map((key) => dbList[key]);
        resolve(trackers);
      })
      .catch((error) => {
        console.log(`error :${error}`);
        reject(error);
      });
  });
