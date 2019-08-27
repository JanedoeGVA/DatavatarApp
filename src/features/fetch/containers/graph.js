import React from 'react';
import { NavigationEvents } from 'react-navigation';

import { View, Text, Button, ActivityIndicator } from 'react-native';
import LinearGraph from '../../../components/graph';

class Graph extends React.Component {
  static navigationOptions = {
    title: 'Data visualization'
  };

  constructor(props) {
    super(props);
    this.state = {
      isData: false,
      data: [1, 2, 4]
    };
  }

  load = () => {
    const { navigation } = this.props;
    const heartRate = navigation.getParam('data');
    this.setState({ isData: true, data: heartRate.data });
    console.log(heartRate);
    console.log(heartRate.data);
    console.log(this.state.data);
    console.log(heartRate.data.map((item) => item['heart-rate']));
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
        {this.state.isData && <LinearGraph data={this.state.data} />}
      </View>
    );
  }
}

export default Graph;
