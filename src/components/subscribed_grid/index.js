import React from 'react';
import GridView from 'react-native-super-grid';
import styles from './styles';
import SubscribedGridItem from '../subscribed_grid_item';
import gridComponentType from './type';

const SubscribedGridComponent = ({
  lstSubscribed,
  onPressItem,
  setItemColor
}) => (
  <GridView
    itemDimension={130}
    items={lstSubscribed}
    style={styles.gridView}
    renderItem={(item) => (
      <SubscribedGridItem {...{ onPressItem, setItemColor, item }} />
    )}
  />
);

SubscribedGridComponent.propTypes = gridComponentType.isRequired;

export default SubscribedGridComponent;
