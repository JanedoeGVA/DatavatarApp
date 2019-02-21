import reducer from '../index';
import * as types from '../../constant';
import trackers from '../../../../../config/jtest/mockData';
import { ADD_TRACKER } from '../../../../api/activity_tracker';

describe('home reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      lstSubscribedTrackers: [ADD_TRACKER],
      loadIsSuccess: false,
      loadIsProcessing: false,
      loadHasErrored: false,
      updateHasErrored: false,
      updateIsProcessing: false
    });
  });

  it('should return has errored to be true', () => {
    expect(
      reducer(
        {},
        {
          type: types.LOAD_HAS_ERRORED,
          payload: true
        }
      )
    ).toEqual({
      payload: true
    });
  });

  it('should return processing to be true', () => {
    expect(
      reducer(
        {},
        {
          type: types.LOAD_IS_PROCESSING,
          payload: true
        }
      )
    ).toEqual({
      payload: true
    });
  });

  it('should return the new state', () => {
    expect(
      reducer(undefined, {
        type: types.LOAD_SUCCESS,
        payload: trackers
      })
    ).toEqual({
      lstSubscribedTrackers: [ADD_TRACKER, ...trackers],
      isProcessing: false,
      hasErrored: false
    });
  });
});
