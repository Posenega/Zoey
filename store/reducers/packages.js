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
  FILTER_PACKAGES,
  UPDATE_PACKAGE,
} from "../actions/packages";

const initialState = {
  hasInit: false,
  hasInitUserPackages: false,
  hasInitSoldPackages: false,
  packages: [],
  filteredPackages: [],
  favoritePackages: [],
  userPackages: [],
  isLoading: false,
  addingIsLoading: false,
  error: null,
  soldPackages: [],
  isFiltering: false,
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
        userPackages: action.soldPackages
          ? state.userPackages
          : [...action.packages],
        soldPackages: action.soldPackages
          ? [...action.packages]
          : state.soldPackages,
        hasInitUserPackages: true,
        hasInitSoldPackages: action.soldPackages
          ? true
          : state.hasInitSoldPackages,
      };
    case ADD_PACKAGE:
      return {
        ...state,
        // packages: [action.package, ...state.packages],
        // filteredPackages: [action.package, ...state.filteredPackages],
        userPackages: [action.package, ...state.userPackages],
        addingIsLoading: false,
      };
    case ADD_PACKAGE_START:
      return { ...state, addingIsLoading: true };
    case ADD_PACKAGE_FAILURE:
      return { ...state, addingIsLoading: false };
    case DELETE_PACKAGE:
      const filterPackages = (packages) =>
        packages.filter(({ _id }) => _id !== action.packageId);
      return {
        ...state,
        packages: filterPackages(state.packages),
        filteredPackages: filterPackages(state.filteredPackages),
        userPackages: filterPackages(state.userPackages),
        soldPackages: filterPackages(state.soldPackages),
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
        favoritePackages: [...action.packages],
      };
    case FETCH_FAVORITES_PACKAGES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case FILTER_PACKAGES:
      const filteredPackages = state.packages.filter((myPackage) => {
        if (
          action.searchTerm &&
          !myPackage.title
            .toLowerCase()
            .startsWith(action.searchTerm.toLowerCase())
        ) {
          return false;
        }

        if (
          action.categories &&
          action.categories.length > 0 &&
          !action.categories.some((cat) => myPackage.categories.includes(cat))
        ) {
          return false;
        }
        if (
          action.grades &&
          action.grades.length > 0 &&
          !action.grades.includes(myPackage.grade)
        ) {
          return false;
        }
        if (action.otherFilters) {
          if (
            action.otherFilters.includes("For School") &&
            !myPackage.isForSchool
          ) {
            return false;
          }
          if (
            action.otherFilters.includes("new") &&
            myPackage.condition !== "new"
          ) {
            return false;
          }
          if (
            action.otherFilters.includes("used") &&
            myPackage.condition !== "used"
          ) {
            return false;
          }
        }

        return true;
      });

      return {
        ...state,
        filteredPackages,
        isSearching: !!action.searchTerm,
        isFiltering: filteredPackages.length !== state.packages.length,
      };
    case UPDATE_PACKAGE:
      const packageIndex = state.userPackages.findIndex(
        (pk) => pk._id === action.packageId
      );
      if (packageIndex < 0) {
        return state;
      }

      if (action.isSold) {
        state.userPackages.splice(packageIndex, 1);
        return {
          ...state,

          userPackages: [...state.userPackages],
          soldPackages: [action.updatedPackage, ...state.soldPackages],
        };
      }

      state.userPackages.splice(packageIndex, 1, action.updatedPackage);

      return {
        ...state,
        userPackages: [...state.userPackages],
      };
    default:
      return state;
  }
};

export default packagesReducer;
