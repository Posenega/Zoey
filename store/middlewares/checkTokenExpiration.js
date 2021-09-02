import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { LOGOUT } from "../actions/auth";

export default checkTokenExpirationMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    SecureStore.getItemAsync("userData").then((userData) => {
      if (userData) {
        const { token } = JSON.parse(userData);
        if (token && jwtDecode(token).exp - 60 < Date.now() / 1000) {
          SecureStore.deleteItemAsync("userData").then(() =>
            dispatch({ type: LOGOUT })
          );
        } else {
          next(action);
        }
      } else {
        next(action);
      }
    });
  };
