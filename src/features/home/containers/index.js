import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { load as actionLoad, update as actionUpdate } from '../actions';
import TrackerGrid from '../../../components/tracker_grid';
import { ADD_TRACKER } from '../../../api/activity_tracker';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  componentDidMount() {
    console.log('@Home componentDidMount');
    const { load } = this.props;
    load();
  }

  refreshToken = async (refreshToken) => {
    try {
      const response = await fetch(
        `https://datavatar.sytes.net/api/fitbit/refresh`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            assertion: refreshToken
          }
        }
      );
      const code = await response.status;
      console.log(`Response : ${JSON.stringify(code)}`);
      if (code === 401) {
        // TODO: invalid tracker
      }
      if (code === 200) {
        // TODO: UPDATE tracker token
      }
    } catch (error) {
      return error;
    }
  };

  getDataAsync = async (item) => {
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
            assertion: item.token.accessTokenKey
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
        // refreshToken
      }
      return json;
    } catch (error) {
      return error;
    }
  };

  onPressItem = (item) => {
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
