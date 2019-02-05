import { combineReducers } from 'redux';
import subscribe from '../features/subscribe/reducers';
import home from '../features/home/reducers';

export default combineReducers({
  subscribe,
  home
  // add other reducers...
});
