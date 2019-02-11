import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const TrackerGridItem = ({
  onPressItem,
  setItemColor,
  item,
  showAvailable
}) => (
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
        source={item.logo}
      />
      <Text style={styles.itemName}>{item.provider.toString()}</Text>
      {showAvailable && (
        <Text
          style={
            item.isAvailable ? styles.itemAvailable : styles.itemNotAvailable
          }
        >
          {item.isAvailable ? 'Available' : 'Subcribed'}
        </Text>
      )}
    </View>
  </TouchableHighlight>
);

export default TrackerGridItem;

TrackerGridItem.defaultProps = {
  showAvailable: false
};

TrackerGridItem.propTypes = {
  onPressItem: PropTypes.func.isRequired,
  setItemColor: PropTypes.func.isRequired,
  item: PropTypes.shape({
    provider: PropTypes.string.isRequired,
    logo: PropTypes.oneOfType([
      PropTypes.shape({ testUri: PropTypes.string }),
      PropTypes.number
    ]).isRequired
  }).isRequired,
  showAvailable: PropTypes.bool
};
