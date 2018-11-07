import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createActTracker } from '../../features/subscribe/actions';
import PropTypes from 'prop-types';

const actTracker = {
  apiName: 'Nike',
  isValide: true,
  type: 'OAUTH2',
  accessTokenKey: 'aadasd425252'
};

class ApplicationNavigator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{`isloading =${this.props.isProcessing}`}</Text>
        <Text>{`hasErrored =${this.props.hasErrored}`}</Text>
        <Text>{`item =${JSON.stringify(this.props.item)}`}</Text>
        <Button
          onPress={() => this.props.addTracker(actTracker)}
          title="Add Tracker"
        />
      </View>
    );
  }
}

ApplicationNavigator.propTypes = {
  addTracker: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isProcessing: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    item: state.subscribe.item,
    hasErrored: state.subscribe.hasErrored,
    isProcessing: state.subscribe.isProcessing
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    margin: 20,
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    flex: 1,
    margin: 20,
    backgroundColor: 'orange',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 70
  }
});
