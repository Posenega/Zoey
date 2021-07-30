export const ADD_REF = "ADD_REF";
export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_CLOSE = "MODAL_CLOSE";
export const MODAL_SET_EDIT_MODE = "MODAL_SET_EDIT_MODE";
export const MODAL_SET_STATE = "MODAL_SET_STATE";

export const addRef = (ref) => ({
  type: ADD_REF,
  ref,
});

export const modalOpen = () => ({ type: MODAL_OPEN });
export const modalClose = () => ({ type: MODAL_CLOSE });
export const modalSetEditMode = (book) => ({
  type: MODAL_SET_EDIT_MODE,
  book,
});
export const modalSetState = (modalState) => ({
  type: MODAL_SET_STATE,
  modalState,
});
