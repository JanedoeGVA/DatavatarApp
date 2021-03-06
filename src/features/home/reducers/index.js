import {
  LOAD_IS_PROCESSING,
  LOAD_HAS_ERRORED,
  LOAD_SUCCESS,
  UPDATE_IS_PROCESSING,
  UPDATE_HAS_ERRORED,
  UPDATE_SUCCESS,
  REVOKE_SUCCESS,
  REVOKE_HAS_ERRORED,
  REVOKE_IS_PROCESSING
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
  updateIsProcessing: false,
  revokeHasErrored: false,
  revokeIsProcessing: false
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
    case UPDATE_SUCCESS:
      const oldLstSubscribedTrackers = state.lstSubscribedTrackers.filter(
        (tracker) =>
          !action.payload.some((newTracker) => tracker.id === newTracker.id)
      );
      return {
        ...state,
        lstSubscribedTrackers: oldLstSubscribedTrackers.concat(action.payload)
      };
    case REVOKE_IS_PROCESSING:
      const index = state.lstSubscribedTrackers.findIndex(
        (subscribed) => subscribed.id === action.payload.id
      );
      console.log(`index = ${index}`);
      return {
        ...state,
        lstSubscribedTrackers: [
          ...state.lstSubscribedTrackers.slice(0, index),
          ...state.lstSubscribedTrackers.slice(1 + index)
        ],
        revokeIsProcessing: true
      };
    case REVOKE_HAS_ERRORED:
      return {
        ...state,
        revokeHasErrored: action.payload,
        revokeIsProcessing: false
      };
    case REVOKE_SUCCESS:
      return {
        ...state,
        revokeIsProcessing: false
      };
    default:
      return state;
  }
};

export default create;
