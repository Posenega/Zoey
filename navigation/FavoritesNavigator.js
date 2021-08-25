import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoritesScreen, {
  screenOptions,
} from "../screens/FavoritesScreen";
import BookDetailScreen, {
  screenOptions as bookDetailScreenOptions,
} from "../screens/BookDetailScreen";
import Colors, { getThemeColor } from "../constants/Colors";
import { connect } from "react-redux";

const Stack = createStackNavigator();

const FavoritesNavigator = (props) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerTransparent: true,

      headerTitleStyle: {
        fontFamily: "rubik-bold",
        fontSize: 18,
        color: getThemeColor("text", props.theme),
      },
      cardStyle: {
        backgroundColor: getThemeColor("background", props.theme),
      },
      headerTitleAlign: "left",
    }}>
    <Stack.Screen
      name="favorite"
      component={FavoritesScreen}
      options={screenOptions}
    />
  </Stack.Navigator>
);

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(FavoritesNavigator);
