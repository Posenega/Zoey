import { ADD_REF, MODAL_CLOSE, MODAL_OPEN } from "../actions/addBookModal";

const initialState = {
  ref: null,
  modalOpen: false,
};

const addBookModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REF:
      return { ...state, ref: action.ref };
    case MODAL_OPEN:
      return { ...state, modalOpen: true };
    case MODAL_CLOSE:
      return { ...state, modalOpen: false };
    default:
      return state;
  }
};

export default addBookModalReducer;
