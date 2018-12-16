import reducer from '../index';
import * as types from '../../constant';

describe('home reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      lstSubscribedTrackers: [types.ADD_TRACKER],
      isProcessing: false,
      hasErrored: false
    });
  });

  it('should ', () => {
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

  it('should ', () => {
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
  it('should ', () => {
    expect(
      reducer(
        {},
        {
          type: types.LOAD_SUCCESS,
          lstSubscribedTrackers: {
            id: 3,
            provider: 'Fibit',
            logo: 2
          }
        }
      )
    ).toEqual({
      lstSubscribedTrackers: {
        id: 3,
        provider: 'Fibit',
        logo: 2
      }
    });
  });
  // it('should ', () => {
  //   expect(
  //     reducer(
  //       {
  //         lstSubscribedTrackers: [{ id: 3 }],
  //         isProcessing: false,
  //         hasErrored: false
  //       },
  //       {
  //         type: types.LOAD_SUCCESS,
  //         lstSubscribedTrackers: { id: 2 }
  //       }
  //     )
  //   ).toEqual({
  //     lstSubscribedTrackers: { id: 1 }
  //   });
  // });
});
