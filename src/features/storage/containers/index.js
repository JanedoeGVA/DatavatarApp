import React from 'react';

import { View, Text } from 'react-native';

import SwipableList from '../../../components/swipable_list';

const arr = [{ key: 1, text: 'item 1' }, { key: 2, text: 'item 2' }];

class Storage extends React.Component {
  static navigationOptions = {
    title: 'Storage'
  };

  render() {
    return <SwipableList data={arr} />;
  }
}

export default Storage;
