import {
  SUBSCRIBE_HAS_ERRORED,
  SUBSCRIBE_IS_PROCESSING,
  SUBSCRIBE_SUCCESS,
  LOAD_HAS_ERRORED,
  LOAD_IS_PROCESSING,
  LOAD_SUCCESS
} from '../constant';

const INITIAL_STATE = {
  lstTrackers: [],
  isProcessing: false,
  hasErrored: false
};

const subscribe = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HAS_ERRORED:
      return { ...state, hasErrored: action.hasErrored };
    case LOAD_IS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case LOAD_SUCCESS:
      return {
        ...state,
        // TODO: WARNING IMMUTABLE ????
        lstTrackers: action.lstTrackers
      };
    case SUBSCRIBE_HAS_ERRORED:
      return { ...state, hasErrored: action.hasErrored };
    case SUBSCRIBE_IS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case SUBSCRIBE_SUCCESS:
      return { ...state, lstTrackers: action.lstTrackers };
    default:
      return state;
  }
};

export default subscribe;
