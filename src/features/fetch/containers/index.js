import React from 'react';
import moment from 'moment';
import Dates from 'react-native-dates';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Datavatar from '../../../api/datavatar';
import { Token, ActivityTracker } from '../../../api/activity_tracker';
import * as store from '../../../store';
import { formatDate } from '../../../api/date';

class Fetch extends React.Component {
  static navigationOptions = {
    title: 'Fetch'
  };

  state = {
    date: null,
    focus: 'startDate',
    startDate: null,
    endDate: null
  };

  getData = () => {
    // const { startDate, endDate } = this.state;
    const startDate = formatDate(this.state.startDate);
    const endDate = formatDate(this.state.endDate);
    store
      .getLstActTrackerSubscribed()
      .then((lstActTracker) => {
        console.log(`lstActTracker ${lstActTracker}`);
        const actTracker = lstActTracker[0];
        console.log(`actTracker ${actTracker}`);
        Datavatar.getData(actTracker, startDate, endDate)
          .then((data) => {
            if (data.tokenNotValid) {
              console.log(`token not valid`);
              Datavatar.refresh(
                actTracker.provider,
                actTracker.token.refreshToken
              )
                .then((token) => {
                  if (token) {
                    console.log(`token recreate`);
                    // update token
                    console.log(
                      `token before ${JSON.stringify(actTracker.token)}`
                    );
                    console.log(`token received ${JSON.stringify(token)}`);
                    store
                      .updateActTrackerToken(actTracker, token, false)
                      .then((actTrackerUpdated) => {
                        // getData again...
                        console.log(
                          `token after ${JSON.stringify(
                            actTrackerUpdated.token
                          )}`
                        );
                        Datavatar.getData(actTrackerUpdated, startDate, endDate)
                          .then((dataset) => {
                            console.log(`dataset ${JSON.stringify(dataset)}`);
                            // return data
                            return null;
                          })
                          .catch((error) => error);
                      })
                      .catch((error) => error);
                  } else {
                    console.log(`invalid token`);
                    // invalid actTracker
                    store
                      .updateActTrackerToken(
                        actTracker,
                        { accessToken: null, refreshToken: null, secret: null },
                        true
                      )
                      .then(() => null)
                      .catch((error) => error);
                  }
                })
                .catch((error) => error);
            } else {
              // return data
              console.log(`data ${JSON.stringify(data)}`);
              return null;
            }
          })
          .catch((error) => error);
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
        <Dates
          onDatesChange={onDatesChange}
          isDateBlocked={isDateBlocked}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          focusedInput={this.state.focus}
          range
        />

        {/* {this.state.date && (
          <Text style={styles.date}>
            {this.state.date && this.state.date.format('LL')}
          </Text>
        )}
        <Text
          style={[
            styles.date,
            this.state.focus === 'startDate' && styles.focused
          ]}
        >
          {this.state.startDate &&
            `start date :${this.state.startDate.format('LL')}`}
        </Text>
        <Text
          style={[
            styles.date,
            this.state.focus === 'endDate' && styles.focused
          ]}
        >
          {this.state.endDate && `end date :${this.state.endDate.format('LL')}`}
        </Text> */}
        <Button onPress={this.getData} title="Fetch" color="#841584" />
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
  load: () => dispatch(actionLoad()),
  update: () => dispatch(actionUpdate())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fetch);
