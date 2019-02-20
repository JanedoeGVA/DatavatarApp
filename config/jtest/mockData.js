const logoStrava = require('../../src/assets/images/strava-logo.png');
const logoGarmin = require('../../src/assets/images/garmin-logo.png');

const trackers = [
  {
    id: 10,
    provider: 'Strava',
    isAvailable: true,
    protocol: '',
    token: {
      accessTokenKey: '',
      refreshTokenKey: '',
      accessTokenSecret: ''
    },
    logo: logoStrava
  },
  {
    id: 11,
    provider: 'Garmin',
    isAvailable: true,
    protocol: '',
    token: {
      accessTokenKey: '',
      refreshTokenKey: '',
      accessTokenSecret: ''
    },

    logo: logoGarmin
  }
];

export default trackers;
