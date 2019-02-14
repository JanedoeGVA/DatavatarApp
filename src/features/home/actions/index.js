import {
  getLstActTrackerSubscribed,
  loadIfDBEmpty
} from '../../../api/activity_tracker';
import {
  LOAD_IS_PROCESSING,
  LOAD_HAS_ERRORED,
  LOAD_SUCCESS,
  UPDATE_IS_PROCESSING,
  UPDATE_HAS_ERRORED,
  UPDATE_SUCCESS
} from '../constant';
import Realm from 'realm';

export const loadIsProcessing = (bool) => ({
  type: LOAD_IS_PROCESSING,
  bool
});

export const loadHasErrored = (bool) => ({
  type: LOAD_HAS_ERRORED,
  bool
});

export const loadSuccess = (bool) => ({
  type: LOAD_SUCCESS,
  bool
});

export const updateIsProcessing = (bool) => ({
  type: UPDATE_IS_PROCESSING,
  bool
});

export const updateHasErrored = (bool) => ({
  type: UPDATE_HAS_ERRORED,
  bool
});

export const updateSuccess = (lstSubscribedTrackers) => ({
  type: UPDATE_SUCCESS,
  lstSubscribedTrackers
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

export const update = () => (dispatch) => {
  console.log(`Realm default path = ${Realm.defaultPath}`);
  dispatch(updateIsProcessing(true));
  return getLstActTrackerSubscribed()
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
