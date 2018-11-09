import { ITEM_CREATE_SUCCESS } from '../constant';
import { CREATE_IS_PROCESSING } from '../constant';
import { CREATE_ITEM_HAS_ERRORED } from '../constant';
import { lstTrackers } from '../../../api/activity_tracker';

const INITIAL_STATE = {
  lstTrackers: lstTrackers,
  isProcessing: false,
  hasErrored: false
};

const create = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ITEM_HAS_ERRORED:
      return { ...state, hasErrored: action.hasErrored };
    case CREATE_IS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case ITEM_CREATE_SUCCESS:
      return { ...state, lstTrackers: action.lstTrackers };
    default:
      return state;
  }
};

export default create;
