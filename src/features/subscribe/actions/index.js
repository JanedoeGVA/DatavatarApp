import * as store from '../../../store';
import {
  SUBSCRIBE_HAS_ERRORED,
  SUBSCRIBE_IS_PROCESSING,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_MOUNT
} from '../constant';

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
    .then((actTracker) => {
      dispatch(isProcessing(false));
      return actTracker;
    })
    .then((actTracker) => {
      dispatch(createSuccess(actTracker));
    })
    .catch(() => dispatch(subscribeHasErrored(true)));
};
