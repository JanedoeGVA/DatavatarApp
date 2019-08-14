import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import * as Constant from '../../api/constant';
import gridItemType from './type';
import styles from './styles';

const actions = [
  {
    text: 'Revoke',
    icon: require('../../assets/images/delete-icon.png'),
    name: 'bt_revoke',
    position: 1
  }
];

const SubscribedGridItem = ({ onPressItem, item }) =>
  item.tracker.provider !== Constant.ADD_PROVIDER ? (
    <SubscribedGridItemWithFloatingAction
      onPressItem={onPressItem}
      item={item}
    />
  ) : (
    <SubscribedGridItemWithTouchable onPressItem={onPressItem} item={item} />
  );

const SubscribedGridItemWithTouchable = ({ onPressItem, item }) => (
  <TouchableHighlight
    onPress={() => {
      onPressItem(item);
    }}
  >
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: '#c3ddd0'
        }
      ]}
    >
      <Image
        activeOpacity={styles.opacity}
        style={styles.logo}
        source={item.tracker.logo}
      />
      <Text style={styles.itemName}>{item.tracker.provider.toString()}</Text>
    </View>
  </TouchableHighlight>
);

const SubscribedGridItemWithFloatingAction = ({ onPressItem, item }) => (
  <View
    style={[
      styles.itemContainer,
      {
        backgroundColor: '#8be1b7'
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
    <FloatingAction
      color="#126666"
      iconWidth={10}
      iconHeight={10}
      distanceToEdge={5}
      actions={actions}
      onPressItem={(name) => {
        console.log(`selected button: ${name}`);
        console.log(`tracker: ${JSON.stringify(item)}`);
        onPressItem(item);
      }}
    />
  </View>
);

export default SubscribedGridItem;

SubscribedGridItem.propTypes = gridItemType.isRequired;
