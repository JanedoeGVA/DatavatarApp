import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import PropTypes from 'prop-types';

export default class GridComponent extends React.Component {
  state = { listApi: this.props.listApi };

  //called when data changes, listener on realm for exemple
  reloadListApi = (listApi) => {
    this.setState({
      listApi: listApi
    });
  };

  static propTypes = {
    onPressItem: PropTypes.func.isRequired,
    setItemColor: PropTypes.func.isRequired,
    title: PropTypes.string,
    listApi: PropTypes.array
  };

  // Default props below propTypes
  static defaultProps = {
    setItemColor: (name) => {
      name === '' ? '#c7e1d4' : '#8be1b7';
    },
    model: {
      id: 0
    },
    title: 'Your Name'
  };

  getApiImage = () => {
    switch (apiName) {
      case 'fitbit':
        return require('@images/fitbit-logo.png');
      case 'nokia_health':
        return require('@images/nokia_health-logo.png');
      case 'garmin':
        return require('@images/garmin-logo.png');
      default:
        break;
    }
  };

  render() {
    const {
      onPressItem,
      setItemColor,
      item: { apiName, type }
    } = this.props;
    return (
      <GridView
        itemDimension={130}
        items={this.state.listApi}
        style={grid.gridView}
        renderItem={(item) => (
          <TouchableHighlight
            onPress={() => {
              onPressItem;
            }}
          >
            <View
              style={[
                grid.itemContainer,
                {
                  backgroundColor: setItemColor(apiName)
                }
              ]}
            >
              <Image
                activeOpacity={50}
                style={grid.logo}
                source={this.getApiImage(apiName)}
              />
              <Text style={grid.itemName}>{apiName}</Text>
              <Text style={grid.itemCode}>{type}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}
