import React from 'react';
import renderer from 'react-test-renderer';
import TrackerGrid from '../index';
// import trackers from '../../../../config/jtest/mockData';
const logoStrava = require('../../../assets/images/strava-logo.png');
const logoGarmin = require('../../../assets/images/garmin-logo.png');

jest.mock(logoGarmin, () => 1);
jest.mock(logoStrava, () => 2);
const trackers = [
  {
    logo: logoStrava,
    provider: 'Strava'
  },
  {
    logo: logoGarmin,
    provider: 'Garmin'
  }
];
describe('Tracker Grid Component', () => {
  it('renders a TrackerGrid using Snapshots', () => {
    expect(
      renderer.create(
        <TrackerGrid
          onPressItem={jest.fn}
          setItemColor={jest.fn}
          lstTrackers={trackers}
        />
      )
    ).toMatchSnapshot();
  });
});
