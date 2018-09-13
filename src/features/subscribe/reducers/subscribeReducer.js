import { combineReducers } from 'redux';
import { SUBSCRIBE_API } from '../constants';
import { listApi } from '@api/constants';

const INITIAL_STATE = { current: [], possible: listApi };

const subscribeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUBSCRIBE_API:
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      const { current, possible } = state;

      // Pull api out of api.possible
      // Note that action.payload === index
      const addedApi = possible.splice(action.payload, 1);

      // And put api in api.current
      current.push(addedApi);

      // Finally, update our redux state
      const newState = { current, possible };
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  api: subscribeReducer
});
