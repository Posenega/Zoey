import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BooksNavigator from "./BooksNavigator";
import Colors from "../constants/Colors";
import CategoryButton from "../components/Icons/CategoryButton";
import FavoriteButton from "../components/Icons/FavoriteButton";
import MessageButton from "../components/Icons/MessageButton";
import ProfileButton from "../components/Icons/ProfileButton";
import AddButton from "../components/Icons/AddButton";
import FavoritesNavigator from "./FavoritesNavigator";
import MessageNavigator from "./MessageNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProfileNavigator from "./ProfileNavigator";

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => (
  <BottomTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.primaryColor,
      tabBarInactiveTintColor: "#C9C9C9",
      tabBarShowLabel: false,
    }}
  >
    <BottomTab.Screen
      name="Explore"
      component={BooksNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <CategoryButton color={color} size={size} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Favorites"
      component={FavoritesNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FavoriteButton color={color} size={size} />
        ),
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
          return {};
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
            return {};
          })(),
        };
      }}
    />
  </BottomTab.Navigator>
);

export default TabNavigator;
