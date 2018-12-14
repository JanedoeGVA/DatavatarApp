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

  it('should handle ADD_TODO', () => {
    expect(
      reducer([], {
        type: types.LOAD_HAS_ERRORED,
        hasErrored: false
      })
    ).toEqual({
      hasErrored: false
    });

    //     expect(
    //       reducer(
    //         [
    //           {
    //             text: 'Use Redux',
    //             completed: false,
    //             id: 0
    //           }
    //         ],
    //         {
    //           type: types.ADD_TODO,
    //           text: 'Run the tests'
    //         }
    //       )
    //     ).toEqual([
    //       {
    //         text: 'Run the tests',
    //         completed: false,
    //         id: 1
    //       },
    //       {
    //         text: 'Use Redux',
    //         completed: false,
    //         id: 0
    //       }
    //     ]);
  });
});
