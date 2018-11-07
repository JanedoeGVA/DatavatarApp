import { ITEM_CREATE_SUCCESS } from '../constant';
import { CREATE_IS_PROCESSING } from '../constant';
import { CREATE_ITEM_HAS_ERRORED } from '../constant';

const INITIAL_STATE = {
  item: {},
  isProcessing: false,
  hasErrored: false
};

export const createHasErrored = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ITEM_HAS_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
};

export const createIsProcessing = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_IS_PROCESSING:
      return action.isProcessing;
    default:
      return state;
  }
};

export const createSuccess = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ITEM_CREATE_SUCCESS:
      return action.item;
    default:
      return state;
  }
};
