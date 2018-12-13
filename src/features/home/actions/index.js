import { getLstActTrackerSubscribed } from '../../../api/activity_tracker';
import {
  LOAD_IS_PROCESSING,
  LOAD_HAS_ERRORED,
  LOAD_SUCCESS
} from '../constant';

export const isProcessing = (bool) => ({
  type: LOAD_IS_PROCESSING,
  payload: bool
});

export const loadHasErrored = (bool) => ({
  type: LOAD_HAS_ERRORED,
  payload: bool
});

export const loadSuccess = (lstSubscribedTrackers) => ({
  type: LOAD_SUCCESS,
  payload: lstSubscribedTrackers
});

export const load = () => (dispatch) => {
  dispatch(isProcessing(true));
  getLstActTrackerSubscribed()
    .then((lstSubscribedTrackers) => {
      dispatch(isProcessing(false));
      dispatch(loadSuccess(lstSubscribedTrackers));
    })
    .catch(() => dispatch(loadHasErrored(true)));
};
