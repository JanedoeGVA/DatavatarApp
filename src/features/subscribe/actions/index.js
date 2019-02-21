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
  payload: bool
});

export const loadHasErrored = (bool) => ({
  type: LOAD_HAS_ERRORED,
  payload: bool
});

export const loadSuccess = (lstTrackers) => ({
  type: LOAD_SUCCESS,
  payload: lstTrackers
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

export const subscribeIsProcessing = (bool) => ({
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

export const subscribeActTracker = (oauthAccessToken) => (dispatch) => {
  dispatch(subscribeIsProcessing(true));
  console.log(
    `@subscribeActTracker oauthAccessToken ${JSON.stringify(oauthAccessToken)}`
  );
  console.log('store updateActTracker');
  store
    .registerToken(oauthAccessToken)
    .then((actTracker) => {
      console.log('store updateActTracker done');
      console.log(
        `store updateActTracker actTracker ${JSON.stringify(actTracker)}`
      );
      dispatch(subscribeIsProcessing(false));
      console.log('store updateActTracker dispatch');
      return actTracker;
    })
    .then((actTracker) => {
      console.log(' dispatch subscribeSuccess ');
      dispatch(subscribeSuccess(actTracker));
    })
    .catch((error) => {
      console.log(`error : ${error}`);
      dispatch(subscribeHasErrored(true));
    });
};
