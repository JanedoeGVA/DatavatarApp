import {
  LOAD_IS_PROCESSING,
  LOAD_HAS_ERRORED,
  LOAD_SUCCESS
} from '../constant';
import { ADD_TRACKER } from '../../../api/activity_tracker';

const INITIAL_STATE = {
  lstSubscribedTrackers: [ADD_TRACKER],
  isProcessing: false,
  hasErrored: false
};

const create = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HAS_ERRORED:
      return { ...state, hasErrored: action.hasErrored };
    case LOAD_IS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case LOAD_SUCCESS:
      return {
        ...state,
        lstSubscribedTrackers: [
          ...state.lstSubscribedTrackers,
          ...action.lstSubscribedTrackers
        ]
      };
    default:
      return state;
  }
};

export default create;
