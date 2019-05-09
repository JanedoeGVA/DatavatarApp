import React from 'react';
import GridView from 'react-native-super-grid';
import styles from './styles';
import TrackerGridItem from '../tracker_grid_item';
import gridComponentType from './type';

const GridComponent = ({ lstTrackers, onPressItem, setItemColor }) => (
  <GridView
    itemDimension={130}
    items={lstTrackers}
    style={styles.gridView}
    renderItem={(item) => (
      <TrackerGridItem {...{ onPressItem, setItemColor, item }} />
    )}
  />
);

GridComponent.propTypes = gridComponentType.isRequired;

export default GridComponent;
