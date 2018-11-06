import { combineReducers } from 'redux';
import { createHasErrored } from './createHasErrored';
import { create } from './create';
import { createIsProcessing } from './createIsProcessing';

export default combineReducers({
  createHasErrored,
  create,
  createIsProcessing
});
