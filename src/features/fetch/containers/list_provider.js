import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, Text, Button, ActivityIndicator } from 'react-native';

import ListTrackers from '../../../components/tracker_list';
import { getLstActTrackerSubscribed } from '../../../api/activity_tracker';

class ListProviders extends React.Component {
  static navigationOptions = {
    title: 'Activity Trackers'
  };

  state = {
    isLoading: true,
    lstTracker: []
  };

  navigate = (actTracker) => {
    const { navigation } = this.props;
    navigation.navigate('RequestData', { currentActTracker: actTracker });
  };

  onPressItem = (item) => {
    this.navigate(item);
  };

  load = () => {
    setTimeout(
      () =>
        getLstActTrackerSubscribed()
          .then((lstSubscribedTrackers) => {
            console.log(`update`);
            console.log(
              `lstSubscribedTrackers : ${JSON.stringify(lstSubscribedTrackers)}`
            );
            this.setState({
              isLoading: false,
              lstTracker: lstSubscribedTrackers
            });
          })
          .catch((error) => {
            console.log(error);
          }),
      900
    );
  };

  render() {
    const { isLoading, lstTracker } = this.state;

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
          <ListTrackers data={lstTracker} onPressItem={this.onPressItem} />
        )}
      </View>
    );
  }
}

export default ListProviders;
