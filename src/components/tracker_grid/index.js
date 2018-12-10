import React from 'react';
import PropTypes from 'prop-types';
import GridView from 'react-native-super-grid';
import styles from './styles';
import TrackerGridItem from '../tracker_grid_item';

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

GridComponent.propTypes = {
  onPressItem: PropTypes.func.isRequired,
  setItemColor: PropTypes.func.isRequired,
  lstTrackers: PropTypes.arrayOf(
    PropTypes.shape({
      // logo: PropTypes.number.isRequired,
      provider: PropTypes.string.isRequired
    })
  ).isRequired
};

export default GridComponent;
// export default class GridComponent extends React.Component {
//   render() {
//     const { onPressItem, setItemColor, lstTrackers } = this.props;
//     return (
//       <GridView
//         itemDimension={130}
//         items={lstTrackers}
//         style={styles.gridView}
//         renderItem={(item) => (
//           <TrackerGridItem {...{ onPressItem, setItemColor, item }} />
//         )}
//       />
//     );
//   }
// }
