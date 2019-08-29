import React from 'react';
import { View, Text } from 'react-native';
// import data from './data';
import moment from 'moment';
import { NavigationEvents } from 'react-navigation';
import HeartRateList from '../../../components/hr_list';

const dateFormatter = (x) => moment.unix(x).format('HH:mm');

/**
 * Returns an array with arrays of the given size.
 *
 * @param {Object[]} array Array to split
 * @param {number} size Size of every group
 * @return {[Object[]]}
 */
const chunkArray = (array, size) => {
  var index = 0;
  var arrayLength = array.length;
  var tempArray = [];
  for (index = 0; index < arrayLength; index += size) {
    chunk = array.slice(index, index + size);
    const average =
      chunk.reduce((p, c) => p + c['heart-rate'], 0) / chunk.length;
    tempArray.push({
      start: dateFormatter(chunk[0]['date']),
      end: dateFormatter(chunk[chunk.length - 1]['date']),
      average: average,
      data: chunk
    });
  }
  return tempArray;
};

class ListHeartRate extends React.Component {
  static navigationOptions = {
    title: 'Heart-Rate list'
  };

  navigate = (heartRate) => {
    const { navigation } = this.props;
    navigation.navigate('Graph', {
      data: heartRate
    });
  };

  onPressItem = (item) => {
    this.navigate(item);
  };

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('data');
    const dataFormat = chunkArray(data.lstHeartRate, 50);
    return (
      <HeartRateList
        heartRateData={dataFormat}
        onPressItem={this.onPressItem}
      />
    );
  }
}

export default ListHeartRate;
