import { func } from 'prop-types';
import { trackerType } from '../../api/activity_tracker/type';

const gridItemComponentType = {
  onPressItem: func.isRequired,
  item: trackerType.isRequired
};

export default gridItemComponentType;
