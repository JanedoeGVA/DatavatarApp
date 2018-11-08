import DBHelper from '../../../db/realm/queries/dbhelper';
import {
  CREATE_IS_PROCESSING,
  CREATE_ITEM_HAS_ERRORED,
  ITEM_CREATE_SUCCESS
} from '../constant';

export const isProcessing = (bool) => {
  return {
    type: CREATE_IS_PROCESSING,
    isProcessing: bool
  };
};

export const createItemHasErrored = (bool) => {
  return {
    type: CREATE_ITEM_HAS_ERRORED,
    hasErrored: bool
  };
};

export const createSuccess = (lstTracker) => {
  return {
    type: ITEM_CREATE_SUCCESS,
    lstTracker
  };
};

export const createActTracker = (actTracker) => {
  return (dispatch) => {
    dispatch(isProcessing(true));
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
