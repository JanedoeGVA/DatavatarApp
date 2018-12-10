import React from 'react';
import { View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { load } from '../actions';
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
    this.props.load();
  }

  onPressItem = (item) => {
    console.log(`item press() : ${JSON.stringify(item)}`);
    if (item.id === ID_ADD) {
      this.props.navigation.navigate('Subscribe');
    } else {
      //Explorer(item)
    }
  };

  setItemColor = (item) => {
    return item.available ? '#8be1b7' : '#c3ddd0';
  };

  render() {
    return (
      <View>
        <TrackerGrid
          onPressItem={this.onPressItem}
          setItemColor={this.setItemColor}
          lstTrackers={this.props.lstSubscribedTrackers.concat(ADD_TRACKER)}
        />
      </View>
    );
  }
}

Home.propTypes = {
  lstSubscribedTrackers: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    lstSubscribedTrackers: state.home.lstSubscribedTrackers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(load())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
