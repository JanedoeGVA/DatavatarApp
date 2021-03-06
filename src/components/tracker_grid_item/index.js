import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import gridItemType from './type';
import styles from './styles';

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
        source={item.logo}
      />
      <Text style={styles.itemName}>{item.provider.toString()}</Text>
    </View>
  </TouchableHighlight>
);

export default TrackerGridItem;

TrackerGridItem.propTypes = gridItemType.isRequired;
