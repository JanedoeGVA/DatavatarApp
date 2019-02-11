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
      return { ...state, hasErrored: action.hasErrored };
    case LOAD_IS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case LOAD_SUCCESS: {
      // if (state.lstTrackers.length === 0) {
      //   return {
      //     ...state,
      //     lstTrackers: [...state.lstTrackers, ...action.lstTrackers]
      //   };
      // }
      // return state;
      // TODO: WARNING IMMUTABLE ????
      // update the list
      const merge = {};
      state.lstTrackers.forEach((trackerAct) => {
        merge[trackerAct.id] = trackerAct;
      });
      action.lstTrackers.forEach((trackerAct) => {
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
      return { ...state, hasErrored: action.hasErrored };
    case SUBSCRIBE_IS_PROCESSING:
      return { ...state, isProcessing: action.isProcessing };
    case SUBSCRIBE_SUCCESS:
      return { ...state, lstTrackers: action.lstTrackers };
    default:
      return state;
  }
};

export default subscribe;
