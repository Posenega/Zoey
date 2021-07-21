import React, { useEffect, useState } from 'react';
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

axios.defaults.baseURL = 'https://stormy-garden-51665.herokuapp.com';

const fetchFonts = () => {
  return Font.loadAsync({
    rubik: require('./assets/fonts/Rubik-Regular.ttf'),
    'rubik-bold': require('./assets/fonts/Rubik-Bold.ttf'),
    'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
