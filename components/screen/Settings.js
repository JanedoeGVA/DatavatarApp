import React from 'react';
import ApiListComponent from '@components/ApiListComponent';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    return <ApiListComponent />;
  }
}
