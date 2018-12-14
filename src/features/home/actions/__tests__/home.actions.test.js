import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../index';
import * as types from '../../constant';
// import { getLstActTrackerSubscribed } from '../../../../api/activity_tracker';

// jest.mock('../../../../api/activity_tracker', () => ({
//   getLstActTrackerSubscribed: jest.fn(
//     () =>
//       new Promise((resolve) => {
//         const lstActTrackerSubscribed = { id: 1 };
//         resolve(lstActTrackerSubscribed);
//       })
//   )
// }));
jest.unmock('../../../../api/activity_tracker');
const myModule = require('../../../../api/activity_tracker');

myModule.getLstActTrackerSubscribed = jest.fn(
  () =>
    new Promise((resolve) => {
      const lstActTrackerSubscribed = { id: 1 };
      resolve(lstActTrackerSubscribed);
    })
);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions features home', () => {
  it('creates LOAD_SUCCESS when fetching load has been done', () => {
    const expectedActions = [
      { bool: true, type: 'HOME::LOAD_IS_PROCESSING' },
      { bool: false, type: 'HOME::LOAD_IS_PROCESSING' },
      {
        lstSubscribedTrackers: { id: 1 },
        type: 'HOME::LOAD_SUCCESS'
      }
    ];
    const store = mockStore({ lstSubscribedTrackers: [] });

    return store.dispatch(actions.load()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action load is processing', () => {
    const bool = true;
    const expectedAction = {
      type: types.LOAD_IS_PROCESSING,
      bool
    };
    expect(actions.isProcessing(bool)).toEqual(expectedAction);
  });

  it('should create an action has errored', () => {
    const bool = true;
    const expectedAction = {
      type: types.LOAD_HAS_ERRORED,
      bool
    };
    expect(actions.loadHasErrored(bool)).toEqual(expectedAction);
  });

  it('should create an action load success with a list of lstSubscribedTrackers', () => {
    const lstSubscribedTrackers = jest.fn();
    const expectedAction = {
      type: types.LOAD_SUCCESS,
      lstSubscribedTrackers
    };
    expect(actions.loadSuccess(lstSubscribedTrackers)).toEqual(expectedAction);
  });
});
