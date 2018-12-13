import {
  LOAD_IS_PROCESSING,
  LOAD_HAS_ERRORED,
  LOAD_SUCCESS,
  ADD_TRACKER
} from '../constant';

const INITIAL_STATE = {
  lstSubscribedTrackers: [ADD_TRACKER],
  isProcessing: false,
  hasErrored: false
};

const create = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HAS_ERRORED:
      return { ...state, hasErrored: action.payload };
    case LOAD_IS_PROCESSING:
      return { ...state, isProcessing: action.payload };
    case LOAD_SUCCESS:
      return { ...state, lstSubscribedTrackers: action.payload };
    default:
      return state;
  }
};

export default create;
