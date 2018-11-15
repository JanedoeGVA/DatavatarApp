import DBHelper from '../../../db/realm/queries/dbhelper';
import {
  SUBSCRIBE_HAS_ERRORED,
  SUBSCRIBE_IS_PROCESSING,
  SUBSCRIBE_SUCCESS
} from '../constant';
import * as Datavatar from '../../../api/datavatar';

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
    Datavatar.authorisation(actTracker.provider, actTracker.authentification);
    console.log('actracker :' + actTracker);
    DBHelper.addActTracker(actTracker)
      .then((actTracker) => {
        dispatch(isProcessing(false));
        return actTracker;
      })
      .then((actTracker) => {
        dispatch(createSuccess(actTracker));
      })
      .catch(() => dispatch(createItemHasErrored(true)));
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
