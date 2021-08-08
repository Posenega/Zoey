import { fetchPackages } from "./packages";

export const SET_SELECTED = "SET_SELECTED";

export const setSelected = (selected) => {
  return { type: SET_SELECTED, selected };
};

export const setBooksSelected = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.bookPackageSelector.selected !== "books") {
      dispatch(setSelected("books"));
    }
  };
};
export const setPackagesSelected = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.bookPackageSelector.selected !== "packages") {
      if (!state.packages.hasInit) {
        dispatch(fetchPackages());
      }
      dispatch(setSelected("packages"));
    }
  };
};
