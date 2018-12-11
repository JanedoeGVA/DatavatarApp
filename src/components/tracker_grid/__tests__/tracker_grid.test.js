import React from 'react';
import renderer from 'react-test-renderer';
import TrackerGrid from '../index';
import trackers from '../../../../config/jtest/mockData';

describe('Tracker Grid Component', () => {
  const trackerGrid = renderer.create(
    <TrackerGrid
      onPressItem={jest.fn}
      setItemColor={jest.fn}
      lstTrackers={trackers}
    />
  );
  it('renders a TrackerGrid using Snapshots', () => {
    expect(trackerGrid).toMatchSnapshot();
  });
  it('TrackerGrid has good image source', () => {
    expect(trackerGrid.toJSON().props.data[0][0].logo.testUri).toBe(
      '../../../src/assets/images/strava-logo.png'
    );
  });
});
