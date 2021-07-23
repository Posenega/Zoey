import React, { useCallback, useEffect, useState } from "react";
import { useNetInfo, NetInfoStateType } from "@react-native-community/netinfo";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import axios from "axios";
import MainNavigator from "./navigation/MainNavigator";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { setCustomText } from "react-native-global-props";
import booksReducer from "./store/reducers/books";
import addBookModalReducer from "./store/reducers/addBookModal";
import AddBookModal from "./components/AddBookModal";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import checkTokenExpirationMiddleware from "./store/middlewares/checkTokenExpiration";
import { Alert, StatusBar } from "react-native";
import chatsReducer from "./store/reducers/chats";
import themesReducer from "./store/reducers/theme";

axios.defaults.baseURL = "http://192.168.1.114:5000";

const fetchFonts = () => {
  return Font.loadAsync({
    rubik: require("./assets/fonts/Rubik-Regular.ttf"),
    "rubik-bold": require("./assets/fonts/Rubik-Bold.ttf"),
    "rubik-medium": require("./assets/fonts/Rubik-Medium.ttf"),
  });
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

  fetchFonts().then(() => setFontsLoaded(true));

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  setCustomText({ style: { fontFamily: "rubik" } });

  const rootReducer = combineReducers({
    books: booksReducer,
    addBookModal: addBookModalReducer,
    auth: authReducer,
    chats: chatsReducer,
    themes: themesReducer,
  });

  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, checkTokenExpirationMiddleware)
  );

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={
          store.getState().themes.includes("dark")
            ? "light-content"
            : "dark-content"
        }
      />
      <MainNavigator />
      <AddBookModal />
    </Provider>
  );
}
