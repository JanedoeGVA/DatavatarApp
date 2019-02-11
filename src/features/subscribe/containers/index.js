import React from 'react';
import { Alert, View, Linking } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrackerGrid from '../../../components/tracker_grid';
import { load as actionLoad, subscribeActTracker } from '../actions';
import * as Datavatar from '../../../api/datavatar';

class Subscribe extends React.Component {
  static navigationOptions = {
    title: 'AddApi'
  };

  componentDidMount() {
    const { load } = this.props;
    load();
  }

  _handleOpenURL = (event) => {
    const { subscribe } = this.props;
    console.log(
      `_handleOpenURL call vérification url : ${JSON.stringify(event)}`
    );
    Datavatar.verification(event.url)
      .then((actTracker) => {
        console.log(
          `@_handleOpenURL actTracker = ${JSON.stringify(actTracker)}`
        );
        subscribe(actTracker);
      })
      .catch((error) => {
        console.error(`Promise is rejected with error: ${error}`);
      });
  };

  onPressItem = (item) => {
    console.log(`item.provider: ${item.provider}`);
    console.log(`item.protocol: ${item.protocol}`);
    console.log(`item.isAvailable: ${item.isAvailable}`);
    if (item.isAvailable) {
      Datavatar.authorization(item.provider, item.protocol);
    } else {
      Alert.alert(`Already in your list`);
    }
    // this.props.addTracker(item);
    // return item.available
    //   ? authorisation(item.api, item.auth_method)
    //   : alert(`Already in your list`);
  };

  setItemColor = (item) => (item.isAvailable ? '#8be1b7' : '#c3ddd0');

  didFocus(payload) {
    console.log('did focus', payload);
    Linking.addEventListener('url', this._handleOpenURL);
  }

  willFocus(payload) {
    console.log('will focus', payload);
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  willBlur(payload) {
    console.log('will blur', payload);
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  render() {
    const { lstTrackers } = this.props;
    return (
      <View>
        <NavigationEvents
          onWillFocus={(payload) => {
            this.willFocus(payload);
          }}
          onDidFocus={(payload) => {
            this.didFocus(payload);
          }}
          onWillBlur={(payload) => {
            this.willBlur(payload);
          }}
          onDidBlur={(payload) => console.log('did blur', payload)}
        />
        <TrackerGrid
          onPressItem={this.onPressItem}
          setItemColor={this.setItemColor}
          lstTrackers={lstTrackers}
          showAvailable
        />
      </View>
    );
  }
}

Subscribe.propTypes = {
  lstTrackers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      provider: PropTypes.string.isRequired,
      isAvailable: PropTypes.bool.isRequired,
      protocol: PropTypes.string.isRequired,
      token: PropTypes.shape({
        isValide: PropTypes.bool.isRequired,
        accessTokenKey: PropTypes.string.isRequired,
        accessTokenSecret: PropTypes.string.isRequired,
        refreshTokenKey: PropTypes.string.isRequired
      }),
      logo: PropTypes.oneOfType([
        PropTypes.shape({ testUri: PropTypes.string }),
        PropTypes.number
      ]).isRequired
    })
  ).isRequired
};

const mapStateToProps = (state) => ({
  lstTrackers: state.subscribe.lstTrackers
});

const mapDispatchToProps = (dispatch) => ({
  subscribe: (tracker) => dispatch(subscribeActTracker(tracker)),
  load: () => dispatch(actionLoad())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscribe);
