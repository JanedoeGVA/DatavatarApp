import { ADD_API, REMOVE_API } from '../constants';

export const addApi = (api) => ({
  type: ADD_API,
  payload: api
});

export const removeApi = (api) => ({
  type: REMOVE_API,
  payload: api
});
