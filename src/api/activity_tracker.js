import PropTypes from 'prop-types';
import * as Constant from './constant';
import * as store from '../store';

class ActivityTracker {
  constructor(id, provider, protocol, logo) {
    this.id = id;
    this.provider = provider;
    this.isAvailable = store.isExist(provider);
    this.isAvailable = true;
    this.isValide = false;
    this.protocol = protocol;
    this.accessTokenKey = '';
    this.refreshTokenKey = '';
    this.accessTokenSecret = '';
    this.logo = logo;
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
  accessTokenSecret: PropTypes.string.isRequired,
  logo: PropTypes.element.isRequired
};

const FITBIT_TRACKER = new ActivityTracker(
  Constant.FITBIT_ID,
  Constant.FITBIT_PROVIDER,
  Constant.OAUTH2,
  Constant.FITBIT_LOGO
);

const GARMIN_TRACKER = new ActivityTracker(
  Constant.GARMIN_ID,
  Constant.GARMIN_PROVIDER,
  Constant.OAUTH1,
  Constant.GARMIN_LOGO
);

const WITHINGS_TRACKER = new ActivityTracker(
  Constant.WITHINGS_ID,
  Constant.WITHINGS_PROVIDER,
  Constant.OAUTH2,
  Constant.WITHINGS_LOGO
);

const STRAVA_TRACKER = new ActivityTracker(
  Constant.STRAVA_ID,
  Constant.STRAVA_PROVIDER,
  Constant.OAUTH2,
  Constant.STRAVA_LOGO
);

export const lstTrackers = [
  FITBIT_TRACKER,
  GARMIN_TRACKER,
  WITHINGS_TRACKER,
  STRAVA_TRACKER
];

const lstTrackersSort = lstTrackers.sort((a, b) => a.id - b.id);

export const getLstActTrackerSubscribed = () =>
  new Promise((resolve, reject) => {
    store
      .getLstActTracker()
      .then((dbList) => {
        let LstActTrackerSubscribed = [];
        let dbArray = Object.keys(dbList).map((key) =>
          LstActTrackerSubscribed.push(lstTrackersSort[dbList[key].id])
        ); //Object.values(apiLists); /**/ !!!ES7 functions seems works only on debug mod */
        console.log(JSON.stringify(dbArray));
        resolve(dbArray);
      })
      .catch((error) => {
        reject(error);
        console.log(`error :${error}`);
      });
  });
