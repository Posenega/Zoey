import React from "react";
import { useSelector, connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import SplashScreen from "../screens/SplashScreen";
import VerificationScreen from "../screens/Auth/VerificationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import DirectMessagesScreen, {
  directMessagesScreenOptions,
} from "../screens/messages/DirectMessagesScreen";
import BookDetailScreen, {
  screenOptions as bookDetailScreenOptions,
} from "../screens/BookDetailScreen";
import SettingsNavigator from "./SettingsNavigator";
import { getThemeColor } from "../constants/Colors";

const MainNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const isTryAutoLogin = useSelector(
    (state) => state.auth.tryAutoLogin
  );
  const isVerify = useSelector((state) => state.auth.isVerify);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: props.theme === "dark" ? "#2b2b2b" : null,
        },
      }}>
      {isTryAutoLogin ? (
        <SplashScreen />
      ) : isVerify ? (
        <VerificationScreen />
      ) : isAuth ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: getThemeColor(
                "background",
                props.theme
              ),
            },
          }}>
          <Stack.Screen name="tab" component={TabNavigator} />
          <Stack.Screen
            options={directMessagesScreenOptions}
            name="chatRoom"
            component={DirectMessagesScreen}
          />
          <Stack.Screen
            name="detail"
            component={BookDetailScreen}
            options={bookDetailScreenOptions}
          />
          <Stack.Screen
            name="settings"
            component={SettingsNavigator}
            options={{ headerTitle: "settings" }}
          />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(MainNavigator);
