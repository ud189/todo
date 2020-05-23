import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from '../../constants/actionTypes';
export function addNote(note) {
  return {
    type: ADD_NOTE,
    note,
  };
}
export function editNote(note) {
  return {
    type: EDIT_NOTE,
    note,
  };
}
export function deleteNote(note) {
  return {
    type: DELETE_NOTE,
    note,
  };
}
