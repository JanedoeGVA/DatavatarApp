import React from 'react';
import { Text, TouchableOpacity, View, Linking } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'react-native-dialog';
import TrackerGrid from '../../../components/tracker_grid';
import { load as actionLoad, subscribeActTracker } from '../actions';
import * as Datavatar from '../../../api/datavatar';
import subscribeType from '../type';

class Subscribe extends React.Component {
  static navigationOptions = {
    title: 'AddApi'
  };

  state = {
    dialogVisible: false,
    avatar: '',
    subscriction: {}
  };

  componentDidMount() {
    const { load } = this.props;
    load();
  }

  showDialog = () => {};

  handleOk = () => {
    const { subscribe } = this.props;
    const { avatar, subscriction } = this.state;
    const { provider, token } = subscriction;
    const { accessToken, secret, refreshToken } = token;
    this.setState({ dialogVisible: false });
    subscribe(avatar, provider, accessToken, secret, refreshToken);
  };

  _handleOpenURL = (event) => {
    const { subscribe } = this.props;
    console.log(
      `_handleOpenURL call vérification url : ${JSON.stringify(event)}`
    );
    // const uri = new URI(event.url);
    // const { code } = uri.query(true);
    // console.log(code);
    Datavatar.verification(event.url)
      .then((subscriction) => {
        console.log(
          `@_handleOpenURL subscribe = ${JSON.stringify(subscriction)}`
        );
        // TODO: WARNING NEED TO SUBSCRIBE a Subscribe not a TRACKER !!!!!!
        // Open a form to set the avatar
        this.setState({ subscriction });
        this.setState({ dialogVisible: true });
        // this.registerAvatar().then((avatar) => {});

        // this.showDialog();

        // subscribe(tracker);
      })
      .catch((error) => {
        console.error(`Promise is rejected with error: ${error}`);
      });
  };

  onPressItem = (item) => Datavatar.authorization(item.provider, item.protocol);

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
        <View>
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Register Tracker</Dialog.Title>
            <Dialog.Description>
              Please provide an avatar name for the registered tracker.
            </Dialog.Description>
            <Dialog.Input
              placeholder="avatar.."
              onChangeText={(text) => this.setState({ avatar: text })}
            />
            <Dialog.Button label="Ok" onPress={this.handleOk} />
          </Dialog.Container>
        </View>
        <TrackerGrid
          onPressItem={this.onPressItem}
          setItemColor={this.setItemColor}
          lstTrackers={lstTrackers}
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
  subscribe: (avatar, provider, accessToken, secret, refresh) =>
    dispatch(
      subscribeActTracker(avatar, provider, accessToken, secret, refresh)
    ),
  load: () => dispatch(actionLoad())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscribe);
