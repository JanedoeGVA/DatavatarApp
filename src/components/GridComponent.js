import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import { grid } from '@styles/Styles';
import GridView from 'react-native-super-grid';
import { listApi } from '@utils/Constant';
import Constant from '@utils/Constant';
import { apiExist } from '@databases/baseSchemas';
import realm from '@databases/baseSchemas';

export default class GridComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
    this.loadList();
    realm.addListener('change', () => {
      this.loadList();
    });
  }

  //called when data changes, listener on realm for exemple

  loadList = () => {
    console.log(Constant.OAUTH_1);
    let x = { z: '1', y: Constant.OAUTH_1 };
    console.log(x.y);
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
  };

  render() {
    const {
      onPressItem,
      setItemColor
      //item: { apiName, type }
    } = this.props;
    return (
      <GridView
        itemDimension={130}
        items={this.state.list}
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
