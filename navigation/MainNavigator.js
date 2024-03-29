import React, { useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useNetInfo, NetInfoStateType } from "@react-native-community/netinfo";
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
import AddModal from "../components/AddModal";

const MainNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const isTryAutoLogin = useSelector((state) => state.auth.tryAutoLogin);
  const isVerify = useSelector((state) => state.auth.isVerify);

  const { isConnected, type } = useNetInfo();

  const showNetworkAlert = useCallback(() => {
    if (type !== NetInfoStateType.unknown && !isConnected) {
      Alert.alert(
        "Network error!",
        "Zoey needs a functional internet connection to work properly. Please check your internet connection and try again later.",
        [],
        { cancelable: false }
      );
    }
  }, [isConnected, type]);

  useEffect(() => {
    showNetworkAlert();
  }, [showNetworkAlert]);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: props.theme === "dark" ? "#2b2b2b" : null,
        },
      }}
    >
      {isTryAutoLogin ? (
        <SplashScreen />
      ) : isVerify ? (
        <VerificationScreen />
      ) : isAuth ? (
        <>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: getThemeColor("background", props.theme),
              },
            }}
          >
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
          <AddModal />
        </>
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
