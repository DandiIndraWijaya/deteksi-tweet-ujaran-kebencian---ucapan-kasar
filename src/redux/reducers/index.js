import { combineReducers } from 'redux';
import model from './model.js';
import auth from './auth.js';

export default combineReducers({
  auth,
  model,
});
