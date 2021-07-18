import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoritesScreen, { screenOptions } from "../screens/FavoritesScreen";
import BookDetailScreen, {
  screenOptions as bookDetailScreenOptions,
} from "../screens/BookDetailScreen";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerShown: true,
  headerTransparent: true,

  headerTitleStyle: {
    fontFamily: "rubik-bold",
    fontSize: 18,
    color: Colors.accentColor,
  },
  headerTitleAlign: "left",
};

const FavoritesNavigator = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen
      name="favorite"
      component={FavoritesScreen}
      options={screenOptions}
    />
    <Stack.Screen
      name="detail"
      component={BookDetailScreen}
      options={bookDetailScreenOptions}
    />
  </Stack.Navigator>
);
export default FavoritesNavigator;
