import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen, {
  screenOptions as exploreScreenOptions,
} from "../screens/ExploreScreen";
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

const BooksNavigator = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen
      name="explore"
      component={ExploreScreen}
      options={exploreScreenOptions}
    />
    <Stack.Screen
      name="detail"
      component={BookDetailScreen}
      options={bookDetailScreenOptions}
    />
  </Stack.Navigator>
);
export default BooksNavigator;
