import {
  CREATE_IS_PROCESSING,
  CREATE_ITEM_HAS_ERRORED,
  LOAD_SUCCESS
} from '../constant';

const INITIAL_STATE = {
  lstSubscribedTrackers: [],
  isProcessing: false,
  hasErrored: false
};

const create = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ITEM_HAS_ERRORED:
      return { ...state, hasErrored: action.hasErrored };
    case CREATE_IS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case LOAD_SUCCESS:
      return { ...state, lstSubscribedTrackers: action.lstSubscribedTrackers };
    default:
      return state;
  }
};

export default create;
