import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import ItemTrackerList from '../item_lst_tracker';
import styles from './styles';

const FlatListItemSeparator = () => <View style={styles.itemSeparator} />;

const ListWeather = (props) => {
  const { data, onPressItem } = props;
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={data}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => (
          <ItemTrackerList item={item} onClick={onPressItem} />
        )}
      />
    </View>
  );
};

export default ListWeather;
