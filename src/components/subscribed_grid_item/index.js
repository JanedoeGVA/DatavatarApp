import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import gridItemType from './type';
import styles from './styles';

const SubscribedGridItem = ({ onPressItem, setItemColor, item }) => (
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
        source={item.tracker.logo}
      />
      <Text style={styles.itemName}>{item.tracker.provider.toString()}</Text>
      <Text style={styles.itemAvailable}>{item.avatar}</Text>
    </View>
  </TouchableHighlight>
);

export default SubscribedGridItem;

SubscribedGridItem.propTypes = gridItemType.isRequired;
