import { combineReducers } from 'redux';
import user from './userReducer';
import note from './noteReducer';
export default combineReducers({
  user,
  note,
});
