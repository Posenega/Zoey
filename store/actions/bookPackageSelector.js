import {
  fetchFavoritePackages,
  fetchPackages,
  fetchUserPackages,
} from "./packages";

export const SET_SELECTED = "SET_SELECTED";
export const SET_MY_SELECTED = "SET_MY_SELECTED";
export const SET_FAVORITES_SELECTED = "SET_FAVORITES_SELECTED";

const setSelected = (selected) => {
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

const setMySelected = (mySelected) => {
  return { type: SET_MY_SELECTED, mySelected };
};

export const setBooksMySelected = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.bookPackageSelector.mySelected !== "books") {
      dispatch(setMySelected("books"));
    }
  };
};
export const setPackagesMySelected = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.bookPackageSelector.mySelected !== "packages") {
      if (!state.packages.hasInitUserPackages) {
        dispatch(fetchUserPackages());
      }
      dispatch(setMySelected("packages"));
    }
  };
};

const setFavoritesSelected = (favoritesSelected) => {
  return { type: SET_FAVORITES_SELECTED, favoritesSelected };
};

export const setBooksFavoritesSelected = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.bookPackageSelector.favoritesSelected !== "books") {
      dispatch(setFavoritesSelected("books"));
    }
  };
};
export const setPackagesFavoritesSelected = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.bookPackageSelector.favoritesSelected !== "packages") {
      if (!state.packages.hasInitUserPackages) {
        dispatch(fetchFavoritePackages());
      }
      dispatch(setFavoritesSelected("packages"));
    }
  };
};
