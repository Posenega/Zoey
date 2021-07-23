import { THEME_SET } from "../actions/theme";

const initialState = {
  theme: "dark",
};

export default themesReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_SET:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};
