import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { load as actionLoad } from '../actions';
import TrackerGrid from '../../../components/tracker_grid';
import { ADD_TRACKER } from '../../../api/activity_tracker';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  componentDidMount() {
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
  load: () => dispatch(actionLoad())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
