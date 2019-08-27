import React from 'react';
import { View, Text } from 'react-native';
import data from './data';
import moment from 'moment';
import HeartRateList from '../../../components/hr_list';

const dateFormatter = (x) => moment(x).format('HH:MM');

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
      start: moment.unix(chunk[0]['date']).format('HH:MM'),
      end: moment.unix(chunk[chunk.length - 1]['date']).format('HH:MM'),
      average: average,
      data: chunk
    });
  }
  return tempArray;
};

const dataFormat = chunkArray(data, 50);

// const array = data.map((obj) => ({
//   x: moment(obj['date']).format('HH:MM'),
//   y: obj['heart-rate']
// }));

class Test extends React.Component {
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
    return (
      <HeartRateList
        heartRateData={dataFormat}
        onPressItem={this.onPressItem}
      />
    );
  }
}

export default Test;
