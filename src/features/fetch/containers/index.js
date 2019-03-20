import React from 'react';
import moment from 'moment';
import Dates from 'react-native-dates';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Datavatar from '../../../api/datavatar';
import { Token } from '../../../api/activity_tracker';
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
        const actTracker = lstActTracker[0];
        Datavatar.getData(actTracker, startDate, endDate).then((data) => {
          if (data.tokenNotValid) {
            Datavatar.refresh(actTracker).then((token) => {
              if (token) {
                // update token
                actTracker.token = token;
                store.updateActTrackerToken(actTracker);
                // getData again...

                Datavatar.getData(actTracker, startDate, endDate)
                  .then((dataset) => {
                    console.log(JSON.stringify(dataset));
                    // return data
                    return null;
                  })
                  .catch((error) => console.log(error));
              } else {
                // invalid actTracker
                actTracker.isAvailable = true;
                actTracker.token = new Token({});
                store.updateActTrackerToken(actTracker);
                // return go subscribe
                return null;
              }
            });
          } else {
            // return data
            console.log(JSON.stringify(data));
            return null;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
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

        {this.state.date && (
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
        </Text>
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
