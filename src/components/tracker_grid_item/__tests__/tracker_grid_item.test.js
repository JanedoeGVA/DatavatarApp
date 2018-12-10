import React from 'react';
import renderer from 'react-test-renderer';
import TrackerGridItem from '../index';
import trackers from '../../../../config/jtest/mockData';

describe('Tracker Grid Item Component', () => {
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
});
