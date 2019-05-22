import { func, bool } from 'prop-types';

const dialogAvatarComponentType = {
  dialogVisible: bool.isRequired,
  onPress: func.isRequired,
  disabled: bool.isRequired,
  onChangeText: func.isRequired
};

export default dialogAvatarComponentType;
