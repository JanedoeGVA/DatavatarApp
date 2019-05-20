import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, Text, Button, ActivityIndicator } from 'react-native';

import ListTrackers from '../../../components/tracker_list';
import { getTrackers } from '../../../api/activity_tracker';

class ListProviders extends React.Component {
  static navigationOptions = {
    title: 'Activity Trackers'
  };

  state = {
    isLoading: true,
    lstTracker: []
  };

  navigate = (tracker) => {
    const { navigation } = this.props;
    navigation.navigate('RequestData', { currentActTracker: tracker });
  };

  onPressItem = (item) => {
    this.navigate(item);
  };

  load = () => {
    setTimeout(
      () =>
        getTrackers()
          .then((lstTrackers) => {
            console.log(`update`);
            console.log(`lstTrackers : ${JSON.stringify(lstTrackers)}`);
            this.setState({
              isLoading: false,
              lstTracker: lstTrackers
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
