import React from 'react';
import PropTypes from 'prop-types';
import GridView from 'react-native-super-grid';
import styles from './styles';
import TrackerGridItem from '../tracker_grid_item';

const GridComponent = ({
  lstTrackers,
  onPressItem,
  setItemColor,
  showAvailable
}) => (
  <GridView
    itemDimension={130}
    items={lstTrackers}
    style={styles.gridView}
    renderItem={(item) => (
      <TrackerGridItem
        {...{ onPressItem, setItemColor, item, showAvailable }}
      />
    )}
  />
);

GridComponent.defaultProps = {
  showAvailable: false
};

GridComponent.propTypes = {
  onPressItem: PropTypes.func.isRequired,
  setItemColor: PropTypes.func.isRequired,
  lstTrackers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      provider: PropTypes.string.isRequired,
      isAvailable: PropTypes.bool.isRequired,
      protocol: PropTypes.string.isRequired,
      token: PropTypes.shape({
        isValide: PropTypes.bool.isRequired,
        accessTokenKey: PropTypes.string.isRequired,
        accessTokenSecret: PropTypes.string.isRequired,
        refreshTokenKey: PropTypes.string.isRequired
      }),
      logo: PropTypes.oneOfType([
        PropTypes.shape({ testUri: PropTypes.string }),
        PropTypes.number
      ]).isRequired
    })
  ).isRequired,
  showAvailable: PropTypes.bool
};

export default GridComponent;
