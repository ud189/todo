import { ADD_USER, EDIT_USER, DELETE_USER } from '../../constants/actionTypes';
export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}
export function editUser(user) {
  return {
    type: EDIT_USER,
    user,
  };
}
export function deleteUser(user) {
  return {
    type: DELETE_USER,
    user,
  };
}
