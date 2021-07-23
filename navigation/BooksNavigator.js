import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen, {
  screenOptions as exploreScreenOptions,
} from "../screens/ExploreScreen";
import BookDetailScreen, {
  screenOptions as bookDetailScreenOptions,
} from "../screens/BookDetailScreen";
import Colors, { getThemeColor } from "../constants/Colors";
import { connect } from "react-redux";

const Stack = createStackNavigator();

const BooksNavigator = (props) => (
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
    }}
  >
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

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(BooksNavigator);
