import {
  SUBSCRIBE_HAS_ERRORED,
  SUBSCRIBE_IS_PROCESSING,
  SUBSCRIBE_SUCCESS,
  LOAD_HAS_ERRORED,
  LOAD_IS_PROCESSING,
  LOAD_SUCCESS
} from '../constant';

const INITIAL_STATE = {
  lstTrackers: [],
  isProcessing: false,
  hasErrored: false
};

const subscribe = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HAS_ERRORED:
      return { ...state, hasErrored: action.payload };
    case LOAD_IS_PROCESSING:
      return { ...state, isProcessing: action.payload };
    case LOAD_SUCCESS: {
      const merge = {};
      state.lstTrackers.forEach((trackerAct) => {
        merge[trackerAct.id] = trackerAct;
      });
      action.payload.forEach((trackerAct) => {
        merge[trackerAct.id] = trackerAct;
      });
      const update = [];
      Object.keys(merge).forEach((key) => {
        update.push(merge[key]);
      });
      return {
        ...state,
        lstTrackers: update
      };
    }
    case SUBSCRIBE_HAS_ERRORED:
      return { ...state, hasErrored: action.payload };
    case SUBSCRIBE_IS_PROCESSING:
      return { ...state, isProcessing: action.payload };
    case SUBSCRIBE_SUCCESS: {
      const merge = {};
      state.lstTrackers.forEach((trackerAct) => {
        merge[trackerAct.id] = trackerAct;
      });
      merge[action.payload.id] = action.payload;
      const update = [];
      Object.keys(merge).forEach((key) => {
        update.push(merge[key]);
      });
      return { ...state, lstTrackers: update };
    }

    default:
      return state;
  }
};

export default subscribe;
