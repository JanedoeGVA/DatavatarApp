import React from 'react';
import ApiListComponent from '@components/ApiListComponent';

export default class Api extends React.Component {
  static navigationOptions = {
    title: 'Api'
  };

  render() {
    return <ApiListComponent />;
  }
}
