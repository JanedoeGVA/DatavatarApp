import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { load as actionLoad, update as actionLoad } from '../actions';
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

  onPressItem = (item) => {
    const { navigation } = this.props;
    if (item.id === ADD_TRACKER.id) {
      navigation.navigate('Subscribe');
    } else {
      // Explorer(item)
    }
  };

  setItemColor = (item) => (item.available ? '#8be1b7' : '#c3ddd0');

  render() {
    const { lstSubscribedTrackers } = this.props;
    return (
      <View>
        <NavigationEvents
          onWillFocus={(payload) => console.log('@Home onWillFocus', payload)}
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
