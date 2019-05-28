import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { load as actionLoad, update as actionUpdate } from '../actions';
import SubscribedGrid from '../../../components/subscribed_grid';
import { ADD_TRACKER } from '../../../api/activity_tracker';
import { revoke } from '../../../api/datavatar';
import { URL_PATH_REVOKE } from '../../../api/constant';

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
    console.log(`click on = ${JSON.stringify(item)}`);
    const { navigation } = this.props;
    if (item.tracker.id === ADD_TRACKER.id) {
      navigation.navigate('Subscribe');
    } else {
      // TODO: revoke token and remove subscribed
      revoke(item)
        .then((response) => {
          if (response.redirect) {
            console.log(`response${JSON.stringify(response)}`);
          } else {
            console.log(`it works`);
          }
        })
        .catch((error) => console.log(`not working ${JSON.stringify(error)}`));
    }
  };

  setItemColor = (item) =>
    item.tracker.protocol !== 'subscribe' ? '#8be1b7' : '#c3ddd0';

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
        <SubscribedGrid
          onPressItem={this.onPressItem}
          setItemColor={this.setItemColor}
          lstSubscribed={lstSubscribedTrackers}
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
