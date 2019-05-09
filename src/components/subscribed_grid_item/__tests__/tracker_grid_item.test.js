import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TrackerGridItem from '../index';
import trackers from '../../../../config/jtest/mockData';

configure({ adapter: new Adapter() });

describe('Tracker Grid Item Component', () => {
  const trackerGridItem = renderer.create(
    <TrackerGridItem
      onPressItem={jest.fn}
      setItemColor={jest.fn}
      item={trackers[0]}
    />
  );
  it('renders a TrackerGridItem using Snapshots', () => {
    expect(trackerGridItem).toMatchSnapshot();
  });
  it('TrackerItem has good image source', () => {
    expect(
      trackerGridItem.toJSON().children[0].children[0].props.source.testUri
    ).toBe('../../../src/assets/images/strava-logo.png');
  });
  it('should return onPress value when calling onPress', () => {
    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('Link on press invoked');
    const wrapper = shallow(
      <TrackerGridItem
        onPressItem={onPressEvent}
        setItemColor={jest.fn}
        item={trackers[0]}
      />
    );
    wrapper
      .find('TouchableHighlight')
      .first()
      .props()
      .onPress();
    expect(onPressEvent.mock.results[0].value).toBe('Link on press invoked');
    expect(onPressEvent.mock.calls.length).toBe(1);
  });
});
