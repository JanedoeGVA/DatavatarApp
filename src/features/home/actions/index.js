import {
  getSubscribed,
  loadIfDBEmpty,
  revokeSubscribed
} from '../../../api/activity_tracker';
import {
  LOAD_IS_PROCESSING,
  LOAD_HAS_ERRORED,
  LOAD_SUCCESS,
  UPDATE_IS_PROCESSING,
  UPDATE_HAS_ERRORED,
  UPDATE_SUCCESS,
  REVOKE_IS_PROCESSING,
  REVOKE_HAS_ERRORED,
  REVOKE_SUCCESS
} from '../constant';
import { removeSubscribed } from '../../../store';

export const loadIsProcessing = (bool) => ({
  type: LOAD_IS_PROCESSING,
  payload: bool
});

export const loadHasErrored = (bool) => ({
  type: LOAD_HAS_ERRORED,
  payload: bool
});

export const loadSuccess = (bool) => ({
  type: LOAD_SUCCESS,
  payload: bool
});

export const revokeSuccess = (bool) => ({
  type: REVOKE_SUCCESS,
  payload: bool
});

export const revokeIsProcessing = (bool) => ({
  type: REVOKE_IS_PROCESSING,
  payload: bool
});

export const revokeHasErrored = (bool) => ({
  type: REVOKE_HAS_ERRORED,
  payload: bool
});

export const updateIsProcessing = (bool) => ({
  type: UPDATE_IS_PROCESSING,
  payload: bool
});

export const updateHasErrored = (bool) => ({
  type: UPDATE_HAS_ERRORED,
  payload: bool
});

export const updateSuccess = (lstSubscribedTrackers) => ({
  type: UPDATE_SUCCESS,
  payload: lstSubscribedTrackers
});

export const load = () => (dispatch) => {
  dispatch(loadIsProcessing(true));
  return loadIfDBEmpty()
    .then(() => {
      console.log(`load`);
      dispatch(loadIsProcessing(false));
      dispatch(loadSuccess(true));
    })
    .catch(() => dispatch(loadHasErrored(true)));
};

export const revoke = (subscribed) => {
  dispatch(revokeIsProcessing(true));
  return revokeSubscribed(subscribed)
    .then(() => {
      dispatch(revokeIsProcessing(false));
      dispatch(revokeSuccess(true));
    })
    .catch(() => dispatch(revokeHasErrored(true)));
};

export const update = () => (dispatch) => {
  dispatch(updateIsProcessing(true));
  return getSubscribed()
    .then((lstSubscribedTrackers) => {
      console.log(`update`);
      console.log(
        `lstSubscribedTrackers : ${JSON.stringify(lstSubscribedTrackers)}`
      );
      dispatch(updateIsProcessing(false));
      dispatch(updateSuccess(lstSubscribedTrackers));
    })
    .catch(() => dispatch(updateHasErrored(true)));
};
