import { ITEM_CREATE_SUCCESS } from '../constant';

const initialState = {
  item: {}
};

const create = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_CREATE_SUCCESS:
      return action.item;
    default:
      state;
  }
};

export default create;
