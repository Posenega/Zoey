import {
  FETCH_PACKAGES_START,
  FETCH_PACKAGES_SUCCESS,
  FETCH_PACKAGES_FAILURE,
  ADD_PACKAGE,
  ADD_PACKAGE_START,
  ADD_PACKAGE_FAILURE,
  DELETE_PACKAGE,
  ADD_FAVORITE_PACKAGE_SUCCESS,
  REMOVE_FAVORITE_PACKAGE_SUCCESS,
  FETCH_FAVORITES_PACKAGES_START,
  FETCH_FAVORITES_PACKAGES_SUCCESS,
  FETCH_FAVORITES_PACKAGES_FAILURE,
  FETCH_USER_PACKAGES,
} from "../actions/packages";

const initialState = {
  hasInit: false,
  packages: [],
  filteredPackages: [],
  favoritePackages: [],
  userPackages: [],
  isLoading: false,
  addingIsLoading: false,
  error: null,
};

const packagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PACKAGES_START:
      return { ...state, isLoading: !action.refresh };
    case FETCH_PACKAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        packages: action.packages,
        filteredPackages: action.packages,
        hasInit: true,
      };
    case FETCH_PACKAGES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case FETCH_USER_PACKAGES:
      return {
        ...state,
        userPackages: [...action.packages, ...state.userPackages],
      };
    case ADD_PACKAGE:
      return {
        ...state,
        packages: [action.package, ...state.packages],
        filteredPackages: [action.package, ...state.filteredPackages],
        userPackages: [action.package, ...state.userPackages],
        addingIsLoading: false,
      };
    case ADD_PACKAGE_START:
      return { ...state, addingIsLoading: true };
    case ADD_PACKAGE_FAILURE:
      return { ...state, addingIsLoading: false };
    case DELETE_PACKAGE:
      console.log(state.packages, " ", action.packageId);
      const filterPackages = (packages) =>
        packages.filter(({ _id }) => _id !== action.packageId);
      return {
        ...state,
        packages: filterPackages(state.packages),
        filteredPackages: filterPackages(state.filteredPackages),
        userBooks: filterPackages(state.userPackages),
      };
    case ADD_FAVORITE_PACKAGE_SUCCESS:
      let toFavPackage = state.packages.find((p) => p._id === action.packageId);
      if (!toFavPackage) {
        return state;
      }
      return {
        ...state,
        favoritePackages: [toFavPackage].concat(state.favoritePackages),
      };
    case REMOVE_FAVORITE_PACKAGE_SUCCESS:
      return {
        ...state,
        favoritePackages: state.favoritePackages.filter(
          (p) => p._id !== action.packageId
        ),
      };
    case FETCH_FAVORITES_PACKAGES_START:
      return { ...state, isLoading: true };
    case FETCH_FAVORITES_PACKAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        favoritePackages: [...action.packages],
      };
    case FETCH_FAVORITES_PACKAGES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case FETCH_FAVORITES_PACKAGES_START:
      return { ...state, isLoading: true };
    case FETCH_FAVORITES_PACKAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        favoriteBooks: [...action.packages],
      };
    case FETCH_FAVORITES_PACKAGES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default packagesReducer;
