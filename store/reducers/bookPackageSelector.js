import { SET_SELECTED } from "../actions/bookPackageSelector";

const initialState = {
  selected: "book",
};

export default bookPackageSelectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return { ...initialState, selected: action.selected };
    default:
      return state;
  }
};
