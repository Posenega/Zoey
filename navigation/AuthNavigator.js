import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/Auth/AuthScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import CreateAccount from '../screens/Auth/CreateAccount';

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerShown: false,
};

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen name='auth' component={AuthScreen} />
    <Stack.Screen name='signIn' component={SignInScreen} />
    <Stack.Screen name='createAccount' component={CreateAccount} />
  </Stack.Navigator>
);
export default AuthNavigator;
