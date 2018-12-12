import { getLstActTrackerSubscribed } from '../../../api/activity_tracker';
import {
  CREATE_IS_PROCESSING,
  CREATE_ITEM_HAS_ERRORED,
  LOAD_SUCCESS
} from '../constant';

export const isProcessing = (bool) => ({
  type: CREATE_IS_PROCESSING,
  payload: bool
});

export const createItemHasErrored = (bool) => ({
  type: CREATE_ITEM_HAS_ERRORED,
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
    .catch(() => dispatch(createItemHasErrored(true)));
};
