import React from 'react';
import { View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { load as actionLoad } from '../actions';
import TrackerGrid from '../../../components/tracker_grid';
import * as Datavatar from '../../../api/datavatar';

const ID_ADD = -1;
const logoAdd = require('../../../assets/images/add.png');

const ADD_TRACKER = {
  id: ID_ADD,
  provider: 'Subscribe',
  logo: logoAdd
};

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
    console.log(`item press() : ${JSON.stringify(item)}`);
    if (item.id === ID_ADD) {
      navigation.navigate('Subscribe');
    } else {
      //Explorer(item)
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
          lstTrackers={lstSubscribedTrackers.concat(ADD_TRACKER)}
        />
      </View>
    );
  }
}

Home.propTypes = {
  lstSubscribedTrackers: PropTypes.array.isRequired
};

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
