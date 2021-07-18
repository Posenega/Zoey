import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { tryAutoLogin } from "../store/actions/auth";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import SplashScreen from "../screens/SplashScreen";

const MainNavigator = () => {
  const isAuth = useSelector((state) => state.auth.token);
  const isTryAutoLogin = useSelector((state) => state.auth.tryAutoLogin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tryAutoLogin());
  }, []);

  return (
    <NavigationContainer>
      {isTryAutoLogin ? (
        <SplashScreen />
      ) : isAuth ? (
        <TabNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
