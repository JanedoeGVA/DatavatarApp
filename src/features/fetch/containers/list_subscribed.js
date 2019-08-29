import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import * as store from '../../../store';

import ListTrackers from '../../../components/tracker_list';
import { getTrackers } from '../../../api/activity_tracker';

class ListSubscribed extends React.Component {
  static navigationOptions = {
    title: 'Activity Trackers'
  };

  state = {
    isLoading: true,
    lstSubscribed: []
  };

  navigate = (subscribed) => {
    const { navigation } = this.props;
    navigation.navigate('RequestData', {
      currentSubscribedTracker: subscribed
    });
  };

  onPressItem = (item) => {
    this.navigate(item);
  };

  load = () => {
    // TODO: GET Subscribed Trackers not Tracker List !!!!!

    //TEST DATA
    // data.forEach((item) => {
    //   console.log(JSON.stringify(item));
    //   console.log(item['date']);
    //   const epoch = item['date'];
    //   console.log(moment.unix(epoch).format());
    //   const date = moment.unix(epoch).format('HH:mm');
    //   console.log(`long : ${epoch} date : ${date}`);
    // });
    //TEST DATA
    store
      .getAllSubscribed()
      .then((lstSubscribed) => {
        console.log(`lstSubscribed : ${JSON.stringify(lstSubscribed)}`);
        this.setState({
          isLoading: false,
          lstSubscribed: lstSubscribed
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { isLoading, lstSubscribed } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          onWillFocus={(payload) => console.log('will focus', payload)}
          onDidFocus={(payload) => {
            console.log('did focus', payload);
            this.load();
          }}
          onWillBlur={(payload) => console.log('will blur', payload)}
          onDidBlur={(payload) => console.log('did blur', payload)}
        />
        {isLoading && (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            size="large"
            color="#0000ff"
          />
        )}
        {!isLoading && (
          <ListTrackers data={lstSubscribed} onPressItem={this.onPressItem} />
        )}
      </View>
    );
  }
}

export default ListSubscribed;
