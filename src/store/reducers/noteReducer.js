import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE } from '../../constants/actionTypes';
const INITIAL_STATE = {
  notes: {}, //{id:{title,description,assignTo,completed,completedAt}}
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state, notes: { ...state.notes, ...action.note } };
    case EDIT_NOTE:
      return {
        ...state,
        notes: { ...state.notes, ...action.note },
      };
    case DELETE_NOTE:
      delete state.notes[action.note.id];
      return {
        ...state,
        notes: { ...state.notes },
      };
    default:
      return state;
  }
}
