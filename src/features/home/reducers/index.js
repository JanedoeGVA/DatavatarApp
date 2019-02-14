import {
  LOAD_IS_PROCESSING,
  LOAD_HAS_ERRORED,
  LOAD_SUCCESS,
  UPDATE_IS_PROCESSING,
  UPDATE_HAS_ERRORED,
  UPDATE_SUCCESS
} from '../constant';
import { ADD_TRACKER } from '../../../api/activity_tracker';

const INITIAL_STATE = {
  lstSubscribedTrackers: [ADD_TRACKER],
  loadIsSuccess: false,
  loadIsProcessing: false,
  loadHasErrored: false,
  updateHasErrored: false,
  updateIsProcessing: false
};

const create = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HAS_ERRORED:
      return { ...state, loadHasErrored: action.hasErrored };
    case LOAD_IS_PROCESSING:
      return { ...state, loadIsProcessing: action.isProcessing };
    case LOAD_SUCCESS:
      return { ...state, loadIsSuccess: action.isProcessing };
    case UPDATE_HAS_ERRORED:
      return { ...state, loadHasErrored: action.hasErrored };
    case UPDATE_IS_PROCESSING:
      return { ...state, loadIsProcessing: action.isProcessing };
    // TODO: need to merge the items  !!!
    case UPDATE_SUCCESS:
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
