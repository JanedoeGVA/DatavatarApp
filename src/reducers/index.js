import { combineReducers } from 'redux';
import subscribePartener from '../features/subscribe_partener/reducers';
import navigationData from '../navigation/reducers';

export default combineReducers({
  subscribePartener,
  navigationData
});
