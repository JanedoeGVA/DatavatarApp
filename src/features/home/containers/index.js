import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { load as actionLoad, update as actionUpdate } from '../actions';
import TrackerGrid from '../../../components/tracker_grid';
import { ADD_TRACKER, Token } from '../../../api/activity_tracker';
import * as store from '../../../store';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  componentDidMount() {
    console.log('@Home componentDidMount');
    const { load } = this.props;
    load();
  }

  refreshToken = async (actTracker) => {
    const { update } = this.props;
    console.log(`stringify = ${JSON.stringify(actTracker)}`);
    console.log(
      `https://datavatar.sytes.net/api/${actTracker.provider.toLowerCase()}/refresh`
    );
    console.log(`refresh : ${actTracker.token.refreshTokenKey}`);
    let token;
    let isAvailable = false;
    fetch(
      `https://datavatar.sytes.net/api/${actTracker.provider.toLowerCase()}/refresh`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          assertion: actTracker.token.refreshTokenKey
        }
      }
    )
      .then((response) => {
        const code = response.status;
        const { body } = response;
        console.log(`Response refresh : ${JSON.stringify(code)}`);
        if (code === 200) {
          const key = body.Oauth2AccessToken.accessTokenKey;
          const refresh = body.Oauth2AccessToken.refreshToken;
          token = new Token({ key, refresh });
        } else {
          token = new Token({});
          isAvailable = true;
          console.log('Invalid Token, plz subscribe');
        }
        const actTrackerUpdate = {
          provider: actTracker.provider,
          isAvailable,
          token
        };
        store
          .updateActTrackerToken(actTrackerUpdate)
          .then(() => {
            update()
              .then(() => token)
              .catch((error) => error);
          })
          .catch((error) => error);
      })
      .catch((error) => error);
  };

  getDataAsync = async (actTracker) => {
    console.log(
      `https://datavatar.sytes.net/api/${actTracker.provider.toLowerCase()}/refresh`
    );
    try {
      const date = 'today';
      const endDate = 'today';
      const detailLvl = '1min';
      const response = await fetch(
        `https://datavatar.sytes.net/api/fitbit/protecteddata/hearthrate?date=${date}&end-date=${endDate}&detail-level=${detailLvl}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            assertion: actTracker.token.accessTokenKey
          }
        }
      );

      // getData()
      // if code == 200 je recupere la donnee recu (le token est a jour)
      // else if code == 401 {
      //                  refreshToken
      //                  if code == 200 update token et getData()
      //                  if code == 401 unvalid actTracker
      const json = await response.json();
      console.log(`Response JSON : ${JSON.stringify(json)}`);
      const code = await response.status;
      console.log(`Response : ${JSON.stringify(code)}`);
      if (code === 401) {
        this.refreshToken(actTracker);
      }
      return json;
    } catch (error) {
      return error;
    }
  };

  onPressItem = (item) => {
    console.log(`stringify item = ${JSON.stringify(item)}`);
    const { navigation } = this.props;
    if (item.id === ADD_TRACKER.id) {
      navigation.navigate('Subscribe');
    } else {
      this.getDataAsync(item);
    }
  };

  setItemColor = (item) => (item.available ? '#8be1b7' : '#c3ddd0');

  render() {
    const { lstSubscribedTrackers } = this.props;
    return (
      <View>
        <NavigationEvents
          onWillFocus={(payload) => {
            const { update } = this.props;
            update();
            console.log('@Home onWillFocus', payload);
          }}
          onDidFocus={(payload) => console.log('@Home onDidFocus', payload)}
          onWillBlur={(payload) => console.log('@Home onWillBlur', payload)}
          onDidBlur={(payload) => console.log('@Home onDidBlur', payload)}
        />
        <TrackerGrid
          onPressItem={this.onPressItem}
          setItemColor={this.setItemColor}
          lstTrackers={lstSubscribedTrackers}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  lstSubscribedTrackers: state.home.lstSubscribedTrackers
});

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(actionLoad()),
  update: () => dispatch(actionUpdate())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
