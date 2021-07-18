export const ADD_REF = "ADD_REF";
export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_CLOSE = "MODAL_CLOSE";

export const addRef = (ref) => ({
  type: ADD_REF,
  ref,
});

export const modalOpen = () => ({ type: MODAL_OPEN });
export const modalClose = () => ({ type: MODAL_CLOSE });
