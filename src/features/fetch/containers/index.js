import React from 'react';
import moment from 'moment';
import Dates from 'react-native-dates';
import { connect } from 'react-redux';
import { View, Alert, StyleSheet, Button } from 'react-native';
import * as Datavatar from '../../../api/datavatar';
import { revoke as actionRevoke } from '../../home/actions';
import { Token, ActivityTracker } from '../../../api/activity_tracker';
import Graph from '../../../components/graph';
import * as store from '../../../store';
import { formatDate } from '../../../api/date';
import * as Constant from '../../../api/constant';

class Fetch extends React.Component {
  static navigationOptions = {
    title: 'Fetch'
  };

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focus: 'startDate',
      startDate: null,
      endDate: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      currentSubscribedTracker: navigation.state.params.currentSubscribedTracker
    });
  }

  refresh = () =>
    new Promise((resolve, reject) => {
      const { currentSubscribedTracker } = this.state;
      Datavatar.refresh(
        currentSubscribedTracker.tracker.provider,
        currentSubscribedTracker.token.refreshToken
      )
        .then((token) => {
          if (token) {
            const updateToken = new Token({
              id: currentSubscribedTracker.id,
              accessToken: token.accessToken,
              refreshToken: token.refreshToken
            });
            console.log(`refresh received : ${JSON.stringify(updateToken)}`);
            store
              .updateToken(updateToken)
              .then(() => {
                console.log(`updateToken done`);
                this.setState(
                  {
                    currentSubscribedTracker: { token: updateToken }
                  },
                  () => resolve()
                );
              })
              .catch((error) => error);
          } else {
            reject(Constant.INVALID_TOKEN);
          }
        })
        .catch((error) => error);
    });

  getData = () => {
    const { currentSubscribedTracker } = this.state;
    const startDate = this.state.startDate / 1000;
    const endDate = moment(formatDate(this.state.startDate), 'YYYY-MM-DD')
      .add(1, 'day')
      .unix();
    const { navigation } = this.props;
    Datavatar.getData(currentSubscribedTracker, startDate, endDate)
      .then((response) => {
        if (response.data) {
          navigation.navigate('ListHeartRate', { data: response.data });
        } else if (response.tokenNotValid) {
          this.refresh()
            .then(() => {
              console.log(`refresh done`);
              Datavatar.getData(currentSubscribedTracker, startDate, endDate)
                .then((response) => {
                  if (response.data) {
                    navigation.navigate('ListHeartRate', {
                      data: response.data
                    });
                  } else {
                    Alert.alert(
                      'Network error',
                      'Please try again',
                      [
                        {
                          text: 'OK',
                          onPress: () => {}
                        }
                      ],
                      { cancelable: true }
                    );
                  }
                })
                .catch((error) => error);
            })
            .catch((error) => {
              console.log(error);
              if (error === Constant.INVALID_TOKEN) {
                Alert.alert(
                  'Authorisation denied',
                  'The authorisation was removed,please subscribed again',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        const { revoke } = this.props;
                        revoke(currentSubscribedTracker).then(() => {
                          navigation.navigate('Home');
                        });
                      }
                    }
                  ],
                  { cancelable: false }
                );
              }
            });
        } else {
          Alert.alert(
            'Network error',
            'Please try again',
            [
              {
                text: 'OK',
                onPress: () => {}
              }
            ],
            { cancelable: true }
          );
        }
      })
      .catch((error) => error);
  };

  render() {
    const isDateBlocked = (date) => date.isAfter(moment(), 'day');

    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );

    const onDateChange = ({ date }) => this.setState({ ...this.state, date });

    return (
      <View style={styles.container}>
        {!this.state.isData && (
          <Dates
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusedInput={this.state.focus}
            range
          />
        )}

        {!this.state.isData && (
          <Button onPress={this.getData} title="Fetch" color="#841584" />
        )}
        {this.state.isData && <Graph data={this.state.data} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: 20
  },
  date: {
    marginTop: 50
  },
  focused: {
    color: 'blue'
  }
});

const mapStateToProps = (state) => ({
  lstSubscribedTrackers: state.home.lstSubscribedTrackers
});

const mapDispatchToProps = (dispatch) => ({
  revoke: (subscribed) => dispatch(actionRevoke(subscribed))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fetch);
