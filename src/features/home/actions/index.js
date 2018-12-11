import { getLstActTrackerSubscribed } from '../../../api/activity_tracker';
import {
  CREATE_IS_PROCESSING,
  CREATE_ITEM_HAS_ERRORED,
  LOAD_SUCCESS
} from '../constant';

export const isProcessing = (bool) => ({
  type: CREATE_IS_PROCESSING,
  isProcessing: bool
});

export const createItemHasErrored = (bool) => ({
  type: CREATE_ITEM_HAS_ERRORED,
  hasErrored: bool
});

export const loadSuccess = (lstActTrackerSubscribed) => ({
  type: LOAD_SUCCESS,
  lstActTrackerSubscribed
});

export const load = () => (dispatch) => {
  dispatch(isProcessing(true));
  // call api
  getLstActTrackerSubscribed()
    .then((lstActTrackerSubscribed) => {
      dispatch(isProcessing(false));
      return lstActTrackerSubscribed;
    })
    .then((lstActTrackerSubscribed) => {
      dispatch(createSuccess(actTracker));
    })
    .catch(() => dispatch(createItemHasErrored(true)));
};
