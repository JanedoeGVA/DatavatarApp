import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import ItemMeasureList from '../measure_lst_item';
import styles from './styles';

const FlatListItemSeparator = () => <View style={styles.itemSeparator} />;

const ListMeasure = (props) => {
  const { lstMeasure, onPressItem } = props;
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={lstMeasure}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => (
          <ItemMeasureList measure={item} onClick={onPressItem} />
        )}
      />
    </View>
  );
};

export default ListMeasure;
