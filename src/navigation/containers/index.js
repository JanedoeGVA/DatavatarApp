import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Linking,
  TouchableHighlight,
  Platform,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { createActTracker } from '../../features/subscribe/actions';

const actTracker = {
  apiName: 'Nike',
  isValide: true,
  type: 'OAUTH2',
  accessTokenKey: 'aadasd425252'
};

class ApplicationNavigator extends Component {
  ApplicationNavigator;
  render() {
    return (
      <View>
        <Text isloading />
        <Text>{`isloading =${this.props.isloading}`}</Text>
        <Text>{`hasErrored =${this.props.hasErrored}`}</Text>
        <Text>{`item =${this.props.item}`}</Text>
        <Button
          onPress={this.props.addTracker(actTracker)}
          title="Add Tracker"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.item,
    hasErrored: state.createHasErrored,
    isLoading: state.isCreating
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTracker: (actTracker) => dispatch(createActTracker(actTracker))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationNavigator);
