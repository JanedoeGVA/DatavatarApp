import { arrayOf } from 'prop-types';
import { trackerType } from '../../api/activity_tracker/type';

const subscribeType = arrayOf(trackerType).isRequired;

export default subscribeType;
