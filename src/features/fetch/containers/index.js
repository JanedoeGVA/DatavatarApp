import React from 'react';
import moment from 'moment';
import Dates from 'react-native-dates';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Datavatar from '../../../api/datavatar';
import { Token, ActivityTracker } from '../../../api/activity_tracker';
import Graph from '../../../components/graph';
import * as store from '../../../store';
import { formatDate } from '../../../api/date';

class Fetch extends React.Component {
  static navigationOptions = {
    title: 'Fetch'
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      date: null,
      focus: 'startDate',
      startDate: null,
      endDate: null,
      currentActTracker: navigation.state.params.currentActTracker
    };
  }

  // componentWillMount() {
  //   const { navigation } = this.props;
  //   this.setState({
  //     currentActTracker: navigation.state.params.currentActTracker
  //   });
  // }

  getData = () => {
    // const { startDate, endDate } = this.state;
    console.log('getdata');
    const startDate = this.state.startDate / 1000;
    const endDate = moment(formatDate(this.state.startDate), 'YYYY-MM-DD')
      .add(1, 'day')
      .unix();
    console.log(`timestamp = ${startDate} ${endDate}`);
    // store
    //   .getLstActTrackerSubscribed()
    //   .then((lstActTracker) => {
    //     console.log(`lstActTracker ${lstActTracker}`);
    //     const actTracker = lstActTracker[0];
    //     console.log(`actTracker ${actTracker}`);
    const { currentActTracker } = this.state;
    console.log(`currentActTracker = ${JSON.stringify(currentActTracker)}`);
    Datavatar.getData(currentActTracker, startDate, endDate)
      .then((response) => {
        console.log(`response : ${JSON.stringify(response)}`);
        if (response.data) {
          console.log(`data ${JSON.stringify(response.data)}`);
          this.setState({ isData: true, data: response.data });
        } else if (response.tokenNotValid) {
          console.log(`token not valid`);
          Datavatar.refresh(
            currentActTracker.provider,
            currentActTracker.token.refreshToken
          )
            .then((token) => {
              if (token) {
                console.log(`token recreate`);
                // update token
                console.log(
                  `token before ${JSON.stringify(currentActTracker.token)}`
                );
                console.log(`token received ${JSON.stringify(token)}`);
                store
                  .updateActTrackerToken(currentActTracker, token, false)
                  .then((actTrackerUpdated) => {
                    this.setState({ currentActTracker: actTrackerUpdated });
                    // getData again...
                    console.log(
                      `token after ${JSON.stringify(actTrackerUpdated.token)}`
                    );
                    // TODO infinite loop when bad token :O
                    this.getData();
                    // Datavatar.getData(actTrackerUpdated, startDate, endDate)
                    //   .then((dataset) => {
                    //     console.log(`dataset ${JSON.stringify(dataset)}`);
                    //     // return data
                    //     this.setState({ isData: true, data: dataset });
                    //   })
                    //   .catch((error) => error);
                  })
                  .catch((error) => error);
              } else {
                console.log(`invalid token`);
                // invalid actTracker
                store
                  .updateActTrackerToken(
                    currentActTracker,
                    { accessToken: null, refreshToken: null, secret: null },
                    true
                  )
                  .then(() => {
                    this.setState({
                      currentActTracker: {}
                    });
                    return null;
                  })
                  .catch((error) => error);
              }
            })
            .catch((error) => error);
        } else {
          console.log(`error server ${response.error}`);
        }
      })
      .catch((error) => error);
    // })
    // .catch((error) => error);
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
  load: () => dispatch(actionLoad()),
  update: () => dispatch(actionUpdate())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fetch);
