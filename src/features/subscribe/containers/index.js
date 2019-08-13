import React from 'react';
import { View, Linking } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import TrackerGrid from '../../../components/tracker_grid';
import DialogAvatar from '../../../components/dialog_avatar';
import { load as actionLoad, subscribeActTracker } from '../actions';
import * as Datavatar from '../../../api/datavatar';
import subscribeType from '../type';

class Subscribe extends React.Component {
  static navigationOptions = {
    title: 'AddApi'
  };

  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      avatar: '',
      isAvatarEmpty: true,
      subscriction: {}
    };
    this._handleOk = this._handleOk.bind(this);
    this._onDialogAvatarChangeText = this._onDialogAvatarChangeText.bind(this);
  }

  componentDidMount() {
    console.log(` Subsribed Feature compenentDidMount()`);
    const { load } = this.props;
    load();
  }

  _handleOk = () => {
    const { subscribe } = this.props;
    const { avatar, subscriction } = this.state;
    const { provider, token } = subscriction;
    const { accessToken, secret, refreshToken } = token;
    this.setState({ isAvatarEmpty: true, dialogVisible: false });
    subscribe(avatar, provider, accessToken, secret, refreshToken);
  };

  _handleOpenURL = (event) => {
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
        // FIXME: WARNING NEED TO SUBSCRIBE a Subscribe not a TRACKER !!!!!!
        // Open a form to set the avatar
        this.setState({ subscriction });
        this.setState({ dialogVisible: true });
        // this.registerAvatar().then((avatar) => {});

        // this.showDialog();

        // subscribe(tracker);
      })
      .catch((error) => {
        console.error(`Promise is rejected with error: ${error}`);
        return error;
      });
  };

  onPressItem = (item) => Datavatar.authorization(item.provider, item.protocol);

  setItemColor = (item) => {
    const ind = item.id % 4;
    return ind > 1 ? '#8be1b7' : '#c3ddd0';
  };

  _onDialogAvatarChangeText = (text) => {
    this.setState({ avatar: text });
    this.setState({ isAvatarEmpty: !text });
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

  render() {
    const { lstTrackers } = this.props;
    const { dialogVisible, isAvatarEmpty } = this.state;
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
        <DialogAvatar
          dialogVisible={dialogVisible}
          onPress={this._handleOk}
          disabled={isAvatarEmpty}
          onChangeText={this._onDialogAvatarChangeText}
        />
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
