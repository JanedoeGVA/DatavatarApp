import React from 'react';
import { Alert, View, Linking } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrackerGrid from '../../../components/tracker_grid';
import { load as actionLoad, subscribeActTracker } from '../actions';
import * as Datavatar from '../../../api/datavatar';
import subscribeType from '../type';

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
    // const uri = new URI(event.url);
    // const { code } = uri.query(true);
    // console.log(code);
    Datavatar.verification(event.url)
      .then((tracker) => {
        console.log(`@_handleOpenURL tracker = ${JSON.stringify(tracker)}`);
        // TODO: WARNING NEED TO SUBSCRIBE a Subscribe not a TRACKER !!!!!!
        subscribe(tracker);
      })
      .catch((error) => {
        console.error(`Promise is rejected with error: ${error}`);
      });
  };

  onPressItem = (item) => {
    if (item.isAvailable) {
      Datavatar.authorization(item.provider, item.protocol);
    } else {
      Alert.alert(`Already in your list`);
    }
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

Subscribe.propTypes = subscribeType.isRequired;

const mapStateToProps = (state) => ({
  lstTrackers: state.subscribe.lstTrackers
});

const mapDispatchToProps = (dispatch) => ({
  subscribe: (oauthAccessToken) =>
    dispatch(subscribeActTracker(oauthAccessToken)),
  load: () => dispatch(actionLoad())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscribe);
