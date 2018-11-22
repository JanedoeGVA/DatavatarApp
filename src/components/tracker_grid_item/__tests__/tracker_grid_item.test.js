import React from 'react';
import renderer from 'react-test-renderer';
import TrackerGridItem from '../../tracker_grid_item';
import { trackers } from '../../../../config/jtest/mockData';

it('renders a TrackerGridItem using Snapshots', () => {
  expect(
    renderer.create(
      <TrackerGridItem
        onPressItem={jest.fn}
        setItemColor={jest.fn}
        item={trackers[0]}
      />
    )
  ).toMatchSnapshot();
});
