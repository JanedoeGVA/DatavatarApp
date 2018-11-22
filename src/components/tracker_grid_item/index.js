import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class TrackerGridItem extends React.Component {
  render() {
    const { onPressItem, setItemColor, item } = this.props;
    return (
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
          <Text style={styles.itemName}>{item.provider}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

TrackerGridItem.propTypes = {
  onPressItem: PropTypes.func.isRequired,
  setItemColor: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};
