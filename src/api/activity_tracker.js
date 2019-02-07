import PropTypes from 'prop-types';
import * as Constant from './constant';
import * as store from '../store';

const FITBIT_LOGO = require('../assets/images/fitbit-logo.png');
const GARMIN_LOGO = require('../assets/images/garmin-logo.png');
const WITHINGS_LOGO = require('../assets/images/withings-logo.png');
const STRAVA_LOGO = require('../assets/images/strava-logo.png');
const ADD_LOGO = require('../assets/images/add.png');

const getLogo = (provider) => {
  switch (provider) {
    case Constant.FITBIT_PROVIDER:
      return FITBIT_LOGO;
    case Constant.GARMIN_PROVIDER:
      return GARMIN_LOGO;
    case Constant.STRAVA_PROVIDER:
      return STRAVA_LOGO;
    case Constant.WITHINGS_PROVIDER:
      return WITHINGS_LOGO;
    default:
      return ADD_LOGO;
  }
};
class Token {
  constructor() {
    this.isValide = false;
    this.accessTokenKey = '';
    this.accessTokenSecret = '';
    this.refreshTokenKey = '';
  }
}
class ActivityTracker {
  constructor(id, provider, protocol, isAvailable = true) {
    this.id = id;
    this.provider = provider;
    this.isAvailable = isAvailable;
    this.protocol = protocol;
    this.token = new Token();
    this.logo = getLogo(provider);
  }
}

ActivityTracker.propTypes = {
  id: PropTypes.number.isRequired,
  provider: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool,
  protocol: PropTypes.string.isRequired,
  logo: PropTypes.number.isRequired,
  token: PropTypes.objectOf(
    PropTypes.shape({
      isValide: PropTypes.bool,
      accessTokenKey: PropTypes.string,
      refreshTokenKey: PropTypes.string,
      accessTokenSecret: PropTypes.string
    })
  )
};

const FITBIT_TRACKER = new ActivityTracker(
  Constant.FITBIT_ID,
  Constant.FITBIT_PROVIDER,
  Constant.OAUTH2,
  false
);

const GARMIN_TRACKER = new ActivityTracker(
  Constant.GARMIN_ID,
  Constant.GARMIN_PROVIDER,
  Constant.OAUTH1
);

const WITHINGS_TRACKER = new ActivityTracker(
  Constant.WITHINGS_ID,
  Constant.WITHINGS_PROVIDER,
  Constant.OAUTH2
);

const STRAVA_TRACKER = new ActivityTracker(
  Constant.STRAVA_ID,
  Constant.STRAVA_PROVIDER,
  Constant.OAUTH2
);
export const ADD_TRACKER = new ActivityTracker(
  Constant.ADD_ID,
  Constant.ADD_PROVIDER,
  'Subscribe',
  false
);

export const lstTrackers = [
  FITBIT_TRACKER,
  GARMIN_TRACKER,
  STRAVA_TRACKER,
  WITHINGS_TRACKER
];

const getLstActTrackerSubscribedUnsafe = () =>
  new Promise((resolve, reject) => {
    console.log(`getLstActTrackerSubscribedUnsafe`);
    store
      .getLstActTrackerSubscribed()
      .then((dbList) => {
        console.log(`dblist : ${dbList}`);
        const dbArray = Object.keys(dbList).map((key) => dbList[key]);
        resolve(dbArray);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getLstActTrackerSubscribed = () =>
  new Promise((resolve, reject) => {
    console.log(`getLstActTrackerSubscribed`);
    store.isEmpty().then((empty) => {
      if (empty) {
        console.log(`db empty`);
        store
          .addListActTracker(lstTrackers)
          .then(() => {
            getLstActTrackerSubscribedUnsafe().then((dbArray) =>
              resolve(dbArray)
            );
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        console.log(`db not empty`);
        getLstActTrackerSubscribedUnsafe()
          .then((dbArray) => resolve(dbArray))
          .catch((error) => {
            reject(error);
          });
      }
    });
  });

export const getLstActTracker = () =>
  new Promise((resolve, reject) => {
    store
      .getLstActTracker()
      .then((dbList) => {
        const dbArray = Object.keys(dbList).map((key) => dbList[key]);
        resolve(dbArray);
      })
      .catch((error) => {
        reject(error);
        console.log(`error :${error}`);
      });
  });
