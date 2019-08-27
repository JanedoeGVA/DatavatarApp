import React from 'react';

import { View, Text, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import ListMeasure from '../../../components/measure_list';

const HR_LOGO = require('../../../assets/images/hr.png');

class RequestData extends React.Component {
  static navigationOptions = {
    title: 'Request Data'
  };

  constructor(props) {
    super(props);
    this.state = {
      currentSubscribedTracker: {}
    };
    this._onClick = this._onClick.bind(this);
  }

  load = () => {
    const { navigation } = this.props;
    const current = navigation.getParam(
      'currentSubscribedTracker',
      'default-value'
    );
    this.setState({ currentSubscribedTracker: current });
    console.log(`current : ${JSON.stringify(current)}`);
  };

  _onClick = () => {
    const { navigation } = this.props;
    const { currentSubscribedTracker } = this.state;
    navigation.navigate('Fetch', { currentSubscribedTracker });
  };

  render() {
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
        <ListMeasure
          lstMeasure={[{ title: 'Hearth Rate', logo: HR_LOGO }]}
          onPressItem={this._onClick}
        />
      </View>
    );
  }
}

export default RequestData;
