import {
  SET_SELECTED,
  SET_MY_SELECTED,
  SET_FAVORITES_SELECTED,
  SET_SOLD_SELECTED,
} from "../actions/bookPackageSelector";

const initialState = {
  selected: "books",
  mySelected: "books",
  favoritesSelected: "books",
  soldSelected: "books",
};

export default bookPackageSelectorReducer = (state = initialState, action) => {
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
    case SET_SOLD_SELECTED:
      return {
        ...initialState,
        soldSelected: action.soldSelected,
      };
    default:
      return state;
  }
};
