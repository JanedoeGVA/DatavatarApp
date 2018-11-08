import { ITEM_CREATE_SUCCESS } from '../constant';
import { CREATE_IS_PROCESSING } from '../constant';
import { CREATE_ITEM_HAS_ERRORED } from '../constant';

const INITIAL_STATE = {
  lstTrackers: [
    {
      id: 1,
      apiName: 'Fitbit',
      available: true,
      isValide: '',
      type: 'OAUTH2',
      accessTokenKey: 'zzsasd',
      refreshTokenKey: 'assc',
      accessTokenSecret: '',
      image: require('assets/fitbit-logo.png')
    },
    {
      id: 2,
      apiName: 'Withings',
      available: false,
      isValide: 'true',
      type: 'OAUTH2',
      accessTokenKey: 'asca11sc',
      refreshTokenKey: 'asc11aca',
      accessTokenSecret: '',
      image: require('assets/nokia_health-logo.png')
    },
    {
      id: 3,
      apiName: 'Fitbit',
      available: true,
      isValide: 'true',
      type: 'OAUTH2',
      accessTokenKey: 'zzsasd',
      refreshTokenKey: 'assc',
      accessTokenSecret: '',
      image: require('assets/garmin-logo.png')
    }
  ],
  isProcessing: false,
  hasErrored: false
};

const create = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ITEM_HAS_ERRORED:
      return { ...state, hasErrored: action.hasErrored };
    case CREATE_IS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case ITEM_CREATE_SUCCESS:
      return { ...state, lstTrackers: action.lstTrackers };
    default:
      return state;
  }
};

export default create;
