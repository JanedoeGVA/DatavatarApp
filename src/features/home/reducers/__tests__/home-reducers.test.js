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
      loadHasErrored: true
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
      loadIsProcessing: true
    });
  });

  it('should return isSuccess to be true and other to be false', () => {
    expect(
      reducer(undefined, {
        type: types.LOAD_SUCCESS,
        payload: true
      })
    ).toEqual({
      lstSubscribedTrackers: [ADD_TRACKER],
      loadIsSuccess: true,
      loadIsProcessing: false,
      loadHasErrored: false,
      updateHasErrored: false,
      updateIsProcessing: false
    });
  });
});
