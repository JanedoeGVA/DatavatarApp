import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import GridView from 'react-native-super-grid';
import styles from './styles';

export default class GridComponent extends React.Component {
  render() {
    const { onPressItem, setItemColor, lstTrackers } = this.props;
    return (
      <GridView
        itemDimension={130}
        items={lstTrackers}
        style={styles.gridView}
        renderItem={(item) => (
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
                activeOpacity={50}
                style={styles.logo}
                source={item.logo}
              />
              <Text style={styles.itemName}>{item.provider}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}
