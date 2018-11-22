import * as store from '../../../store';
import {
  SUBSCRIBE_HAS_ERRORED,
  SUBSCRIBE_IS_PROCESSING,
  SUBSCRIBE_SUCCESS
} from '../constant';

export const isProcessing = (bool) => {
  return {
    type: SUBSCRIBE_IS_PROCESSING,
    isProcessing: bool
  };
};

export const subscribeHasErrored = (bool) => {
  return {
    type: SUBSCRIBE_HAS_ERRORED,
    hasErrored: bool
  };
};

export const subscribeSuccess = (actTracker) => {
  return {
    type: SUBSCRIBE_SUCCESS,
    actTracker
  };
};

export const subscribeActTracker = (actTracker) => {
  return (dispatch) => {
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
};
/*const delay = (time, actTracker) => {
  new Promise((resolve) =>
    setTimeout(() => {
      dispatch(isProcessing(false));
      resolve(actTracker);
    }, time)
  );
};*/
