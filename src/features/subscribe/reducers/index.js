import { ITEM_CREATE_SUCCESS } from '../constant';
import { CREATE_IS_PROCESSING } from '../constant';
import { CREATE_ITEM_HAS_ERRORED } from '../constant';

const INITIAL_STATE = {
  item: {},
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
      return { ...state, item: action.item };
    default:
      return state;
  }
};

export default create;
