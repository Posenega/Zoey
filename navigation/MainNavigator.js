import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { tryAutoLogin } from "../store/actions/auth";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import SplashScreen from "../screens/SplashScreen";
import VerificationScreen from "../screens/Auth/VerificationScreen";

const MainNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const isTryAutoLogin = useSelector((state) => state.auth.tryAutoLogin);
  const isVerify = useSelector((state) => state.auth.isVerify);

  return (
    <NavigationContainer>
      {isTryAutoLogin ? (
        <SplashScreen />
      ) : isVerify ? (
        <VerificationScreen />
      ) : isAuth ? (
        <TabNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
