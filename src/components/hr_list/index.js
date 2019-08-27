import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import ItemHeartRateList from '../hr_list_item';
import styles from './styles';

const FlatListItemSeparator = () => <View style={styles.itemSeparator} />;

const HeartRateList = (props) => {
  const { heartRateData, onPressItem } = props;
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={heartRateData}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => (
          <ItemHeartRateList heartRate={item} onClick={onPressItem} />
        )}
      />
    </View>
  );
};

export default HeartRateList;
