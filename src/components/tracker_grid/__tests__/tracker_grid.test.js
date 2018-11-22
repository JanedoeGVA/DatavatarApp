import React from 'react';
import renderer from 'react-test-renderer';
import TrackerGrid from '../../tracker_grid';
import { trackers } from '../../../../config/jtest/mockData';

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
