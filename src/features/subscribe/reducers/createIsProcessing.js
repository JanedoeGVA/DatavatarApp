import { CREATE_IS_PROCESSING } from '../constant';

const initialState = {
  isCreating: false
};

const createIsProcessing = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_IS_PROCESSING:
      return action.isProcessing;
    default:
      state;
  }
};

export default createIsProcessing;
