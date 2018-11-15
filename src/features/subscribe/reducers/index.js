import {
  SUBSCRIBE_HAS_ERRORED,
  SUBSCRIBE_IS_PROCESSING,
  SUBSCRIBE_SUCCESS
} from '../constant';
import { lstTrackers } from '../../../api/activity_tracker';

const INITIAL_STATE = {
  lstTrackers: lstTrackers,
  isProcessing: false,
  hasErrored: false
};

const subscribe = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
