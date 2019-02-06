import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { LOGO, lstTrackers } from '../../api/activity_tracker';

const getLogo = (provider) => {
  console.log(`provider = ${provider}`);
  switch (provider) {
    case lstTrackers.FITBIT_TRACKER.provider:
      return LOGO.FITBIT_LOGO;
    case lstTrackers.GARMIN_TRACKER.provider:
      return LOGO.GARMIN_LOGO;
    case lstTrackers.STRAVA_TRACKER.provider:
      return LOGO.STRAVA_LOGO;
    case lstTrackers.WITHINGS_TRACKER.provider:
      return LOGO.WITHINGS_LOGO;
    default:
      return LOGO.ADD_LOGO;
  }
};

const TrackerGridItem = ({ onPressItem, setItemColor, item }) => (
  <TouchableHighlight
    onPress={() => {
      onPressItem(item);
    }}
  >
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: setItemColor(item)
        }
      ]}
    >
      <Image
        activeOpacity={styles.opacity}
        style={styles.logo}
        source={getLogo(item.provider)}
      />
      <Text style={styles.itemName}>{item.provider}</Text>
    </View>
  </TouchableHighlight>
);

export default TrackerGridItem;

TrackerGridItem.propTypes = {
  onPressItem: PropTypes.func.isRequired,
  setItemColor: PropTypes.func.isRequired,
  item: PropTypes.shape({
    provider: PropTypes.string.isRequired
    // logo: PropTypes.oneOfType([
    //   PropTypes.shape({ testUri: PropTypes.string }),
    //   PropTypes.number
    // ]).isRequired
  }).isRequired
};
// export default class TrackerGridItem extends React.Component {
//   render() {
//     const { onPressItem, setItemColor, item } = this.props;
//     return (
//       <TouchableHighlight
//         onPress={() => {
//           onPressItem(item);
//         }}
//       >
//         <View
//           style={[
//             styles.itemContainer,
//             {
//               backgroundColor: setItemColor(item)
//             }
//           ]}
//         >
//           <Image
//             activeOpacity={styles.opacity}
//             style={styles.logo}
//             source={item.logo}
//           />
//           <Text style={styles.itemName}>{item.provider}</Text>
//         </View>
//       </TouchableHighlight>
//     );
//   }
// }
