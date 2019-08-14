import { func, arrayOf } from 'prop-types';
import { trackerType } from '../../api/activity_tracker/type';

const gridComponentType = {
  onPressItem: func.isRequired,
  lstTrackers: arrayOf(trackerType).isRequired
};

export default gridComponentType;
