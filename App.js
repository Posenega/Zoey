import React, { useCallback, useEffect, useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import MainNavigator from './navigation/MainNavigator';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { setCustomText } from 'react-native-global-props';
import booksReducer from './store/reducers/books';
import addBookModalReducer from './store/reducers/addBookModal';
import AddBookModal from './components/AddBookModal';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import checkTokenExpirationMiddleware from './store/middlewares/checkTokenExpiration';
import { Alert } from 'react-native';

axios.defaults.baseURL = 'http://192.168.1.107:5000';

const fetchFonts = () => {
  return Font.loadAsync({
    rubik: require('./assets/fonts/Rubik-Regular.ttf'),
    'rubik-bold': require('./assets/fonts/Rubik-Bold.ttf'),
    'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const { isConnected } = useNetInfo();

  const showNetworkAlert = useCallback(() => {
    if (!isConnected) {
      Alert.alert(
        'Network error!',
        'Please check your internet connection and try again later.',
        [],
        { cancelable: false }
      );
    }
  }, [isConnected]);

  useEffect(() => {
    if (fontsLoaded) {
      showNetworkAlert();
    }
  }, [fontsLoaded, showNetworkAlert]);

  fetchFonts().then(() => setFontsLoaded(true));

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  setCustomText({ style: { fontFamily: 'rubik' } });

  const rootReducer = combineReducers({
    books: booksReducer,
    addBookModal: addBookModalReducer,
    auth: authReducer,
  });

  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, checkTokenExpirationMiddleware)
  );

  return (
    <Provider store={store}>
      <MainNavigator />
      <AddBookModal />
    </Provider>
  );
}
