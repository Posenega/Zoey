import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen, {
  messageOptions,
} from '../screens/messages/MessagesScreen';
import Colors from '../constants/Colors';
import DirectMessagesScreen, {
  directMessagesOptions,
} from '../screens/messages/DirectMessagesScreen';

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerShown: true,
  headerTransparent: true,

  headerTitleStyle: {
    fontFamily: 'rubik-bold',
    fontSize: 18,
    color: Colors.accentColor,
  },
  headerTitleAlign: 'left',
};
const directMessagesScreenOptions = {
  headerShown: false,
};

const MessageNavigator = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen
      name='messages'
      component={MessagesScreen}
      options={messageOptions}
    />
    <Stack.Screen
      screenOptions={directMessagesScreenOptions}
      name='chatRoom'
      component={DirectMessagesScreen}
      options={directMessagesOptions}
    />
  </Stack.Navigator>
);
export default MessageNavigator;
