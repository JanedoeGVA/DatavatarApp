import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import { grid } from '@styles/styles';
import GridView from 'react-native-super-grid';
import { listApi } from '@api/constant';
import { apiExist } from '@databases/baseSchemas';
import realm from '@databases/baseSchemas';

export default class GridComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  /*constructor(props) {
    super(props);
    this.state = { list: [] };
    this.loadList();
    realm.addListener('change', () => {
      this.loadList();
    });
  }*/

  //called when data changes, listener on realm for exemple

  /*loadList = () => {
    compareApi = (apiA, apiB) => {
      if (apiA.available == apiB.available) {
        return apiA.name.localeCompare(apiB.name);
      }
      if (apiB.available) {
        return 1;
      }
      return -1;
    };

    for (let index = 0, size = listApi.length; index < size; index++) {
      let item = listApi[index];
      apiExist(item.api)
        .then((isExist) => {
          if (item.api != 'my_fitnesspal') {
            item.available = !isExist;
          }
          if (index + 1 == size) {
            listApi.sort(compareApi);
            this.setState({ list: listApi });
          }
        })
        .catch((error) => {
          console.error(`error : ${error}`);
        });
    }
  };*/

  render() {
    const { onPressItem, setItemColor, list } = this.props;
    return (
      <GridView
        itemDimension={130}
        items={list}
        style={grid.gridView}
        renderItem={(item) => (
          <TouchableHighlight
            onPress={() => {
              onPressItem(item);
            }}
          >
            <View
              style={[
                grid.itemContainer,
                {
                  backgroundColor: setItemColor(item)
                }
              ]}
            >
              <Image activeOpacity={50} style={grid.logo} source={item.logo} />
              <Text style={grid.itemName}>{item.name}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}
