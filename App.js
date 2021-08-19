import React, { useCallback, useEffect, useState } from "react";
import {
  useNetInfo,
  NetInfoStateType,
} from "@react-native-community/netinfo";

import Constants from "expo-constants";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import axios from "axios";
import MainNavigator from "./navigation/MainNavigator";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { setCustomText } from "react-native-global-props";
import booksReducer from "./store/reducers/books";
import addBookModalReducer from "./store/reducers/addBookModal";
import AddModal from "./components/AddModal";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import checkTokenExpirationMiddleware from "./store/middlewares/checkTokenExpiration";
import { StatusBar } from "react-native";
import chatsReducer from "./store/reducers/chats";
import themesReducer from "./store/reducers/theme";
import { setTheme } from "./store/actions/theme";
import * as SecureStore from "expo-secure-store";
import { tryAutoLogin } from "./store/actions/auth";
import packagesReducer from "./store/reducers/packages";
import { addChat } from "./store/actions/chats";
import bookPackageSelectorReducer from "./store/reducers/bookPackageSelector";

axios.defaults.baseURL = Constants.manifest?.debuggerHost
  ? `http://${Constants.manifest.debuggerHost
      .split(":")
      .shift()}:5000`
  : "https://stormy-garden-51665.herokuapp.com";

const fetchFonts = () => {
  return Font.loadAsync({
    rubik: require("./assets/fonts/Rubik-Regular.ttf"),
    "rubik-bold": require("./assets/fonts/Rubik-Bold.ttf"),
    "rubik-medium": require("./assets/fonts/Rubik-Medium.ttf"),
  });
};

const fetchTheme = async () => {
  const theme = await SecureStore.getItemAsync("theme");
  const parsedTheme = JSON.parse(theme);
  return parsedTheme?.theme;
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // const { isConnected, type } = useNetInfo();

  // const showNetworkAlert = useCallback(() => {
  //   if (type !== NetInfoStateType.unknown && !isConnected) {
  //     Alert.alert(
  //       'Network error!',
  //       'Please check your internet connection and try again later.',
  //       [],
  //       { cancelable: false }
  //     );
  //   }
  // }, [isConnected, type]);

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     showNetworkAlert();
  //   }
  // }, [fontsLoaded, showNetworkAlert]);

  useEffect(() => {
    if (fontsLoaded) {
      store.dispatch(tryAutoLogin());
      fetchTheme().then((theme) => {
        if (theme === "light" || theme === "dark") {
          store.dispatch(setTheme(theme));
        }
      });
    }
  }, [fontsLoaded]);

  fetchFonts().then(() => setFontsLoaded(true));

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  setCustomText({ style: { fontFamily: "rubik" } });

  const appReducer = combineReducers({
    books: booksReducer,
    addBookModal: addBookModalReducer,
    auth: authReducer,
    chats: chatsReducer,
    themes: themesReducer,
    packages: packagesReducer,
    bookPackageSelector: bookPackageSelectorReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === "LOGOUT") {
      const { themes } = state;
      state = { themes };
    }
    return appReducer(state, action);
  };

  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, checkTokenExpirationMiddleware)
  );

  const statusBarTheme =
    store.getState().themes.theme === "dark"
      ? "dark-content"
      : "light-content";
  return (
    <Provider store={store}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={statusBarTheme}
      />
      <MainNavigator />
      <AddModal />
    </Provider>
  );
}
