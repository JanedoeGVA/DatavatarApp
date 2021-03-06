import React from 'react';
import { FlatGrid } from 'react-native-super-grid';
import styles from './styles';
import SubscribedGridItem from '../subscribed_grid_item';
import gridComponentType from './type';

const SubscribedGridComponent = ({ lstSubscribed, onPressItem }) => (
  <FlatGrid
    itemDimension={130}
    items={lstSubscribed}
    style={styles.gridView}
    renderItem={({ item, index }) => (
      <SubscribedGridItem {...{ onPressItem, item }} />
    )}
  />
);

SubscribedGridComponent.propTypes = gridComponentType.isRequired;

export default SubscribedGridComponent;
