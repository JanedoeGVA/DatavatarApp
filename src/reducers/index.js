import { combineReducers } from 'redux';
import settingsData from 'features/settings/reducers';
import userProfileData from 'features/user_profile/reducers';
import subscribeApi from '../features/subscribe_api/reducers';
import navigationData from 'navigation/reducers';

export default combineReducers({
  subscribeApi,
  navigationData
});
