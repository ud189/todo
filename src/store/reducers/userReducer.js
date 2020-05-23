import { ADD_USER, EDIT_USER, DELETE_USER } from '../../constants/actionTypes';
const INITIAL_STATE = {
  users: {}, //{id:{name,designation}}
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: { ...state.users, ...action.user } };
    case EDIT_USER:
      return {
        ...state,
        users: { ...state.users, ...action.user },
      };
    case DELETE_USER:
      delete state.users[action.user.id];
      return {
        ...state,
        users: { ...state.users },
      };
    default:
      return state;
  }
}
