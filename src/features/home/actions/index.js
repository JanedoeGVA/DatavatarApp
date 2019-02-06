import { getLstActTrackerSubscribed } from '../../../api/activity_tracker';
import {
  LOAD_IS_PROCESSING,
  LOAD_HAS_ERRORED,
  LOAD_SUCCESS
} from '../constant';
import Realm from 'realm';

export const isProcessing = (bool) => ({
  type: LOAD_IS_PROCESSING,
  bool
});

export const loadHasErrored = (bool) => ({
  type: LOAD_HAS_ERRORED,
  bool
});

export const loadSuccess = (lstSubscribedTrackers) => ({
  type: LOAD_SUCCESS,
  lstSubscribedTrackers
});

export const load = () => (dispatch) => {
  console.log(`Realm default path = ${Realm.defaultPath}`);

  dispatch(isProcessing(true));
  return getLstActTrackerSubscribed()
    .then((lstSubscribedTrackers) => {
      dispatch(isProcessing(false));
      dispatch(loadSuccess(lstSubscribedTrackers));
    })
    .catch(() => dispatch(loadHasErrored(true)));
};

// export const load = () => (dispatch) => {
//   dispatch(isProcessing(true));
//   getLstActTrackerSubscribed()
//     .then((lstSubscribedTrackers) => {
//       dispatch(isProcessing(false));
//       dispatch(loadSuccess(lstSubscribedTrackers));
//     })
//     .catch(() => dispatch(loadHasErrored(true)));
// };
