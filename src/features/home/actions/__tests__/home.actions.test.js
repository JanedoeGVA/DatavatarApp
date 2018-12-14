import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../index';
import * as types from '../../constant';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions features home', () => {
  it('creates LOAD_SUCCESS when fetching load has been done', () => {
    const expectedActions = [
      { type: types.LOAD_IS_PROCESSING },
      {
        type: types.LOAD_SUCCESS,
        lstSubscribedTrackers: { obj: 1 }
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
