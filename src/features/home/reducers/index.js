import {
  CREATE_IS_PROCESSING,
  CREATE_ITEM_HAS_ERRORED,
  LOAD_SUCCESS
} from '../constant';

const ID_ADD = -1;
const logoAdd = require('../../../assets/images/add.png');

const ADD_TRACKER = {
  id: ID_ADD,
  provider: 'Subscribe',
  logo: logoAdd
};

const INITIAL_STATE = {
  lstSubscribedTrackers: [ADD_TRACKER],
  isProcessing: false,
  hasErrored: false
};

const create = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ITEM_HAS_ERRORED:
      return { ...state, hasErrored: action.payload };
    case CREATE_IS_PROCESSING:
      return { ...state, isProcessing: action.payload };
    case LOAD_SUCCESS:
      return { ...state, lstSubscribedTrackers: action.payload };
    default:
      return state;
  }
};

export default create;
