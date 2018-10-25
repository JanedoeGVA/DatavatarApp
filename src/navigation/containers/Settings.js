import React from 'react';
import ApiList from '@components/ApiList';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    return <ApiList />;
  }
}
