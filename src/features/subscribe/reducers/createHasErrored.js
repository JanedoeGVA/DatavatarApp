import { CREATE_ITEM_HAS_ERRORED } from '../constant';

const initialState = {
  createHasErrored: false
};

const createHasErrored = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ITEM_HAS_ERRORED:
      return action.hasErrored;
    default:
      state;
  }
};

export default createHasErrored;
