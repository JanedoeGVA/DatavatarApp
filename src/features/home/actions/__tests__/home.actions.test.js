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
      { payload: true, type: 'HOME::LOAD_IS_PROCESSING' },
      { payload: false, type: 'HOME::LOAD_IS_PROCESSING' },
      { payload: true, type: 'HOME::LOAD_SUCCESS' }
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
      payload: bool
    };
    expect(actions.loadIsProcessing(bool)).toEqual(expectedAction);
  });

  it('should create an action has errored', () => {
    const bool = true;
    const expectedAction = {
      type: types.LOAD_HAS_ERRORED,
      payload: bool
    };
    expect(actions.loadHasErrored(bool)).toEqual(expectedAction);
  });

  it('should create an action load success', () => {
    const bool = true;
    const expectedAction = {
      type: types.LOAD_SUCCESS,
      payload: bool
    };
    expect(actions.loadSuccess(bool)).toEqual(expectedAction);
  });
});
