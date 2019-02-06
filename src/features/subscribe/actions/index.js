import * as store from '../../../store';
import { getLstActTracker } from '../../../api/activity_tracker';
import {
  SUBSCRIBE_HAS_ERRORED,
  SUBSCRIBE_IS_PROCESSING,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_MOUNT,
  LOAD_IS_PROCESSING,
  LOAD_HAS_ERRORED,
  LOAD_SUCCESS
} from '../constant';

export const isLoadProcessing = (bool) => ({
  type: LOAD_IS_PROCESSING,
  bool
});

export const loadHasErrored = (bool) => ({
  type: LOAD_HAS_ERRORED,
  bool
});

export const loadSuccess = (lstTrackers) => ({
  type: LOAD_SUCCESS,
  lstTrackers
});

export const load = () => (dispatch) => {
  dispatch(isLoadProcessing(true));
  return getLstActTracker()
    .then((lstTrackers) => {
      dispatch(isLoadProcessing(false));
      dispatch(loadSuccess(lstTrackers));
    })
    .catch(() => dispatch(loadHasErrored(true)));
};

export const isMounting = (bool) => ({
  type: SUBSCRIBE_MOUNT,
  payload: bool
});

export const isProcessing = (bool) => ({
  type: SUBSCRIBE_IS_PROCESSING,
  payload: bool
});

export const subscribeHasErrored = (bool) => ({
  type: SUBSCRIBE_HAS_ERRORED,
  payload: bool
});

export const subscribeSuccess = (actTracker) => ({
  type: SUBSCRIBE_SUCCESS,
  payload: actTracker
});

export const subscribeActTracker = (actTracker) => (dispatch) => {
  dispatch(isProcessing(true));
  console.log(
    '@actions subscribeActTracker acTracker = ' + JSON.stringify(actTracker)
  );
  console.log('store addActTracker');

  store
    .addActTracker(actTracker)
    .then(() => {
      dispatch(isProcessing(false));
      return actTracker;
    })
    .then(() => {
      dispatch(subscribeSuccess(actTracker));
    })
    .catch(() => dispatch(subscribeHasErrored(true)));
};
