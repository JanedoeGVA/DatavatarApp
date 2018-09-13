import { ADD_API } from '../constants';

export const addApi = (api) => ({
  type: ADD_API,
  payload: api
});
