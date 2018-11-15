import React from 'react';
import { View, Linking } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import TrackerGrid from '../../../components/tracker_grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { subscribeActTracker } from '../actions';
import * as Datavatar from '../../../api/datavatar';

class Subscribe extends React.Component {
  static navigationOptions = {
    title: 'AddApi'
  };

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

  _handleOpenURL = (event) => {
    console.log(
      '_handleOpenURL call vérification url :' + JSON.stringify(event)
    );
    Datavatar.verification(event.url)
      .then((actTracker) => {
        subscribeActTracker(actTracker);
      })
      .catch((error) => {
        console.error('Promise is rejected with error: ' + error);
      });
  };

  onPressItem = (item) => {
    console.log('coucou');
    console.log(`item.provider: ${item.provider}`);
    console.log(`item.protocol: ${item.protocol}`);
    console.log(`item.isAvailable: ${item.isAvailable}`);
    if (item.isAvailable) {
      Datavatar.authorisation(item.provider, item.authentification);
    } else {
      alert(`Already in your list`);
    }
    //this.props.addTracker(item);
    /*return item.available
      ? authorisation(item.api, item.auth_method)
      : alert(`Already in your list`);*/
  };

  setItemColor = (item) => {
    return item.isAvailable ? '#8be1b7' : '#c3ddd0';
  };

  render() {
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
          lstTrackers={this.props.lstTrackers}
        />
      </View>
    );
  }
}

Subscribe.propTypes = {
  lstTrackers: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    lstTrackers: state.subscribe.lstTrackers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeActTracker: (tracker) => dispatch(subscribeActTracker(tracker))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscribe);
