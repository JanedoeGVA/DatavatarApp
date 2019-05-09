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
  lstSubscribedTrackers: [
    { id: -1, avatar: 'subscribed', token: { id: -1 }, tracker: ADD_TRACKER }
  ],
  loadIsSuccess: false,
  loadIsProcessing: false,
  loadHasErrored: false,
  updateHasErrored: false,
  updateIsProcessing: false
};

const create = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HAS_ERRORED:
      return { ...state, loadHasErrored: action.payload };
    case LOAD_IS_PROCESSING:
      return { ...state, loadIsProcessing: action.payload };
    case LOAD_SUCCESS:
      return { ...state, loadIsSuccess: action.payload };
    case UPDATE_HAS_ERRORED:
      return { ...state, loadHasErrored: action.payload };
    case UPDATE_IS_PROCESSING:
      return { ...state, loadIsProcessing: action.payload };
    case UPDATE_SUCCESS: {
      const oldLstSubscribedTrackers = state.lstSubscribedTrackers.filter(
        (tracker) =>
          !action.payload.some((newTracker) => tracker.id === newTracker.id)
      );
      return {
        ...state,
        lstSubscribedTrackers: oldLstSubscribedTrackers.concat(action.payload)
      };
    }
    default:
      return state;
  }
};

export default create;
