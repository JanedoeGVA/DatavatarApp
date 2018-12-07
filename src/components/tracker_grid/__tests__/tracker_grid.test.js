import React from 'react';
import renderer from 'react-test-renderer';
import TrackerGrid from '../index';
import { trackers } from '../../../../config/jtest/mockData';

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
