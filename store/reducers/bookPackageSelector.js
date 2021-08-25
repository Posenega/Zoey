import {
  SET_SELECTED,
  SET_MY_SELECTED,
  SET_FAVORITES_SELECTED,
} from "../actions/bookPackageSelector";

const initialState = {
  selected: "book",
  mySelected: "book",
  favoritesSelected: "book",
};

export default bookPackageSelectorReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_SELECTED:
      return { ...initialState, selected: action.selected };
    case SET_MY_SELECTED:
      return { ...initialState, mySelected: action.mySelected };
    case SET_FAVORITES_SELECTED:
      return {
        ...initialState,
        favoritesSelected: action.favoritesSelected,
      };
    default:
      return state;
  }
};
