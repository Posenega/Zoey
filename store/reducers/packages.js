import {
  FETCH_PACKAGES_START,
  FETCH_PACKAGES_SUCCESS,
  FETCH_PACKAGES_FAILURE,
  ADD_PACKAGE,
  ADD_PACKAGE_START,
  ADD_PACKAGE_FAILURE,
  DELETE_PACKAGE,
} from "../actions/packages";

const initialState = {
  hasInit: false,
  packages: [],
  filteredPackages: [],
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
    case ADD_PACKAGE:
      return {
        ...state,
        packages: [action.package, ...state.packages],
        filteredPackages: [action.package, ...state.filteredPackages],
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
      };
    default:
      return state;
  }
};

export default packagesReducer;
