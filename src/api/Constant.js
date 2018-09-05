const OAUTH_1 = 'Oauth1.A';
const OAUTH_2 = 'Oauth2.0';

const FITBIT = {
  api: 'fitbit',
  name: 'Fitbit',
  logo: require('@images/fitbit-logo.png'),
  auth_method: OAUTH_2,
  isAvailable: true
};

const NOKIA_HEALTH = {
  api: 'nokia_health',
  name: 'Nokia Health',
  logo: require('@images/nokia_health-logo.png'),
  auth_method: OAUTH_2,
  isAvailable: true
};

const GARMIN = {
  api: 'garmin',
  name: 'Garmin',
  logo: require('@images/garmin-logo.png'),
  auth_method: OAUTH_1,
  isAvailable: true
};

const MY_FITNESSPAL = {
  api: 'my_fitnesspal',
  name: 'my FitnessPal',
  logo: require('@images/my_fitnesspal-logo.png'),
  auth_method: OAUTH_2,
  isAvailable: false
};

const BASE_URL = 'https://datavatar.sytes.net';

export default {
  BASE_URL,
  FITBIT,
  NOKIA_HEALTH,
  GARMIN,
  MY_FITNESSPAL,
  OAUTH_1,
  OAUTH_2
};

export const listApi = [FITBIT, NOKIA_HEALTH, GARMIN, MY_FITNESSPAL];
