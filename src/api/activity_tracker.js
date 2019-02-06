import PropTypes from 'prop-types';
import * as Constant from './constant';
import * as store from '../store';

const FITBIT_LOGO = require('../assets/images/fitbit-logo.png');
const GARMIN_LOGO = require('../assets/images/garmin-logo.png');
const WITHINGS_LOGO = require('../assets/images/withings-logo.png');
const STRAVA_LOGO = require('../assets/images/strava-logo.png');
const ADD_LOGO = require('../assets/images/add.png');

export const LOGO = {
  FITBIT_LOGO,
  GARMIN_LOGO,
  WITHINGS_LOGO,
  STRAVA_LOGO,
  ADD_LOGO
};

class ActivityTracker {
  constructor(id, provider, protocol, isAvailable = true) {
    this.id = id;
    this.provider = provider;
    // this.isAvailable = store.isExist(provider);
    this.isAvailable = isAvailable;
    this.isValide = false;
    this.protocol = protocol;
    this.accessTokenKey = '';
    this.refreshTokenKey = '';
    this.accessTokenSecret = '';
    // this.logo = logo;
  }
}

ActivityTracker.propTypes = {
  id: PropTypes.number.isRequired,
  provider: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  isValide: PropTypes.bool.isRequired,
  protocol: PropTypes.string.isRequired,
  accessTokenKey: PropTypes.string.isRequired,
  refreshTokenKey: PropTypes.string.isRequired,
  accessTokenSecret: PropTypes.string.isRequired
  // logo: PropTypes.element.isRequired
};

const FITBIT_TRACKER = new ActivityTracker(
  Constant.FITBIT_ID,
  Constant.FITBIT_PROVIDER,
  Constant.OAUTH2
  // FITBIT_LOGO
);

const GARMIN_TRACKER = new ActivityTracker(
  Constant.GARMIN_ID,
  Constant.GARMIN_PROVIDER,
  Constant.OAUTH1
  // GARMIN_LOGO
);

const WITHINGS_TRACKER = new ActivityTracker(
  Constant.WITHINGS_ID,
  Constant.WITHINGS_PROVIDER,
  Constant.OAUTH2
  // WITHINGS_LOGO
);

const STRAVA_TRACKER = new ActivityTracker(
  Constant.STRAVA_ID,
  Constant.STRAVA_PROVIDER,
  Constant.OAUTH2
  // STRAVA_LOGO
);
export const ADD_TRACKER = new ActivityTracker(
  Constant.ADD_ID,
  Constant.ADD_PROVIDER,
  'Subscribe',
  false
  // ADD_LOGO
);
// export const ADD_TRACKER = {
//   id: Constant.ADD_ID,
//   provider: Constant.ADD_PROVIDER,
//   logo: ADD_LOGO
// };

export const lstTrackers = {
  FITBIT_TRACKER,
  GARMIN_TRACKER,
  STRAVA_TRACKER,
  WITHINGS_TRACKER
};

// const lstTrackersSort = lstTrackers.sort((a, b) => a.id - b.id);
export const getLstActTrackerSubscribed = () =>
  new Promise((resolve, reject) => {
    // store.addActTracker(STRAVA_TRACKER).then(() => {
    store
      .getLstActTrackerSubscribed()
      .then((dbList) => {
        console.log(`dblist ${JSON.stringify(dbList)}`);
        // const LstActTrackerSubscribed = [];
        const dbArray = Object.keys(dbList).map((key) => dbList[key]);
        // const dbArray = Object.keys(dbList).map((key) =>
        // LstActTrackerSubscribed.push(lstTrackers[dbList[key].id])
        // );
        // Object.values(apiLists); /**/ !!!ES7 functions seems works only on debug mod */
        console.log(`dbarray ${JSON.stringify(dbArray)}`);
        resolve(dbArray);
      })
      .catch((error) => {
        reject(error);
        console.log(`error :${error}`);
      });
    // });
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
