import React, { useEffect } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BooksNavigator from "./BooksNavigator";
import Colors, { getThemeColor } from "../constants/Colors";
import CategoryButton from "../components/Icons/CategoryButton";
import FavoriteButton from "../components/Icons/FavoriteButton";
import MessageButton from "../components/Icons/MessageButton";
import ProfileButton from "../components/Icons/ProfileButton";
import AddButton from "../components/Icons/AddButton";
import FavoritesNavigator from "./FavoritesNavigator";
import MessageNavigator from "./MessageNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProfileNavigator from "./ProfileNavigator";
import { connect, useDispatch } from "react-redux";
import { fetchChats } from "../store/actions/chats";

const BottomTab = createBottomTabNavigator();

const TabNavigator = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: getThemeColor("primary", props.theme),
        tabBarInactiveTintColor: getThemeColor("idle", props.theme),
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Explore"
        component={BooksNavigator}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <CategoryButton color={color} size={size} />
          ),
          tabBarStyle: (() => {
            const routeName = getFocusedRouteNameFromRoute(route);
            if (routeName === "detail") {
              return { display: "none" };
            }
            return {
              elevation: 0,
              borderTopWidth: 0,
              height: 55,
              backgroundColor: getThemeColor("main", props.theme),
            };
          })(),
        })}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FavoriteButton color={color} size={size} />
          ),
          tabBarStyle: {
            elevation: 0,
            borderTopWidth: 0,
            height: 55,
            backgroundColor: getThemeColor("main", props.theme),
          },
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={BooksNavigator}
        listeners={{ tabPress: (e) => e.preventDefault() }}
        options={{
          tabBarIcon: ({ size }) => <AddButton size={size} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessageNavigator}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <MessageButton color={color} size={size} />
          ),
          tabBarStyle: (() => {
            const routeName = getFocusedRouteNameFromRoute(route);
            if (routeName === "chatRoom") {
              return { display: "none" };
            }
            return {
              elevation: 0,
              borderTopWidth: 0,
              height: 55,
              backgroundColor: getThemeColor("main", props.theme),
            };
          })(),
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={({ route }) => {
          return {
            tabBarIcon: ({ color, size }) => (
              <ProfileButton color={color} size={size} />
            ),
            tabBarStyle: (() => {
              const routeName = getFocusedRouteNameFromRoute(route);
              if (routeName === "settings") {
                return { display: "none" };
              }
              if (routeName === "account") {
                return { display: "none" };
              }
              if (routeName === "detail") {
                return { display: "none" };
              }
              return {
                elevation: 0,
                borderTopWidth: 0,
                height: 55,
                backgroundColor: getThemeColor("main", props.theme),
              };
            })(),
          };
        }}
      />
    </BottomTab.Navigator>
  );
};

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(TabNavigator);
