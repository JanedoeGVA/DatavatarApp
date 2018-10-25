import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  TouchableHighlight,
  Platform,
  Alert
} from 'react-native';
import URI from 'urijs';
import { vsprintf } from 'sprintf-js';
import Constant from '@api/constant';
import GridView from 'react-native-super-grid';
import {
  updateApi,
  insertApi,
  deleteApi,
  queryAllApi,
  apiExist
} from '@databases/baseSchemas';
import realm from '@databases/baseSchemas';
import { grid } from '@styles/styles';

//const apiUrl = `${Constant.BASE_URL}/api/%s/%s`;

const addApi = {
  id: -1,
  apiName: '',
  isValide: 'true',
  type: 'Add an API',
  accessTokenKey: '',
  refreshTokenKey: '',
  accessTokenSecret: ''
};

export default class ListApi extends React.Component {
  static navigationOptions = {
    title: 'Health & Wellness partener'
  };

  constructor(props) {
    super(props);
    this.state = {
      apiLists: []
    };
    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
  }

  //A mettre dans une classe externe
  getApiImage = (apiName) => {
    switch (apiName) {
      case 'fitbit':
        return require('@images/fitbit-logo.png');
      case 'nokia_health':
        return require('@images/nokia_health-logo.png');
      case 'garmin':
        return require('@images/garmin-logo.png');
      default:
        return require('@images/add.png');
    }
  };

  reloadData = () => {
    queryAllApi()
      .then((apiLists) => {
        let arr = Object.keys(apiLists).map((key) => apiLists[key]); //Object.values(apiLists); /**/ !!!ES7 functions seems works only on debug mod */
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          console.log(`list : ${JSON.stringify(element)}`);
        }
        arr.push(addApi);
        this.setState({ apiLists: arr });
      })
      .catch((error) => {
        this.setState({ apiLists: [] });
      });
  };

  addApi = () => {
    console.log(`add api`);
    this.props.navigation.navigate('AddApi');
  };

  loadApi = (api) => {
    this.props.navigation.navigate('Explorateur', { ...api });
    console.log(`load api : ${api.apiName}`);
  };

  render() {
    return (
      <GridView
        itemDimension={130}
        items={this.state.apiLists}
        style={grid.gridView}
        renderItem={(item) => (
          <TouchableHighlight
            onPress={() =>
              item.apiName === '' ? this.addApi() : this.loadApi(item)
            }
          >
            <View
              style={[
                grid.itemContainer,
                {
                  backgroundColor: item.apiName === '' ? '#c7e1d4' : '#8be1b7'
                }
              ]}
            >
              <Image
                activeOpacity={50}
                style={grid.logo}
                source={this.getApiImage(item.apiName)}
              />
              <Text style={grid.itemName}>{item.apiName}</Text>
              <Text style={grid.itemCode}>{item.type}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}
