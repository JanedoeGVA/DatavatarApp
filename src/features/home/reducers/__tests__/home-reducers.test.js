import reducer from '../index';
import * as types from '../../constant';
import trackers from '../../../../../config/jtest/mockData';
import { ADD_TRACKER } from '../../../../api/activity_tracker';

describe('home reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      lstSubscribedTrackers: [ADD_TRACKER],
      isProcessing: false,
      hasErrored: false
    });
  });

  it('should return has errored to be true', () => {
    expect(
      reducer(
        {},
        {
          type: types.LOAD_HAS_ERRORED,
          hasErrored: true
        }
      )
    ).toEqual({
      hasErrored: true
    });
  });

  it('should return processing to be true', () => {
    expect(
      reducer(
        {},
        {
          type: types.LOAD_IS_PROCESSING,
          isProcessing: true
        }
      )
    ).toEqual({
      isProcessing: true
    });
  });

  it('should return the new state', () => {
    expect(
      reducer(undefined, {
        type: types.LOAD_SUCCESS,
        lstSubscribedTrackers: trackers
      })
    ).toEqual({
      lstSubscribedTrackers: [ADD_TRACKER, ...trackers],
      isProcessing: false,
      hasErrored: false
    });
  });
});
