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
  state = { listApi: [] };

  static propTypes = {
    onPressItem: PropTypes.func.isRequired,
    title: string
  };

  // Default props below propTypes
  static defaultProps = {
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
    const { onPressItem, title } = this.props;
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
                  backgroundColor: this.state.setColor(item)
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
