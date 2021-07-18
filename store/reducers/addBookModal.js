import {
  ADD_REF,
  MODAL_CLOSE,
  MODAL_OPEN,
  MODAL_SET_EDIT_MODE,
} from "../actions/addBookModal";

const initialState = {
  ref: null,
  modalOpen: false,
  editedBook: null,
};

const addBookModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REF:
      return { ...state, ref: action.ref };
    case MODAL_OPEN:
      return { ...state, modalOpen: true };
    case MODAL_CLOSE:
      return { ...state, modalOpen: false, editedBook: null };
    case MODAL_SET_EDIT_MODE:
      return { ...state, editedBook: action.book };
    default:
      return state;
  }
};

export default addBookModalReducer;
