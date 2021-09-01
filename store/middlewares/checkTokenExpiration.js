import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { logout } from "../actions/auth";

export default checkTokenExpirationMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    SecureStore.getItemAsync("userData").then((userData) => {
      if (userData) {
        const { token } = JSON.parse(userData);
        if (token && jwtDecode(token).exp < Date.now() / 1000) {
          dispatch(logout());
        } else {
          next(action);
        }
      } else {
        next(action);
      }
    });
  };
