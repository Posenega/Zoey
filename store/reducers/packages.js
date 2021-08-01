import {
  FETCH_PACKAGES_START,
  FETCH_PACKAGES_SUCCESS,
  FETCH_PACKAGES_FAILURE,
} from "../actions/packages";

const initialState = {
  packages: [],
  isLoading: false,
  error: null,
};

const packagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PACKAGES_START:
      return { ...state, isLoading: true };
    case FETCH_PACKAGES_SUCCESS:
      console.log({
        ...state,
        isLoading: false,
        packages: [...action.packages],
      });
      return {
        ...state,
        isLoading: false,
        packages: [...action.packages],
      };
    case FETCH_PACKAGES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default packagesReducer;
