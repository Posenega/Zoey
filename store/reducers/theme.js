import { StatusBar } from "react-native";
import { THEME_SET, FETCH_THEME, setTheme } from "../actions/theme";
import * as SecureStore from "expo-secure-store";

const initialState = {
  theme: "light",
};

export default themesReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_SET:
      StatusBar.setBarStyle(
        state.theme === "dark" ? "dark-content" : "light-content"
      );
      SecureStore.setItemAsync(
        "theme",
        JSON.stringify({
          theme: action.theme,
        })
      );
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};
