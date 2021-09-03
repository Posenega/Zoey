import React, { useEffect, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import jwtDecode from "jwt-decode";

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
import io from "socket.io-client";

import { connect, useDispatch, useSelector } from "react-redux";
import { fetchChats, addChat } from "../store/actions/chats";
import { Platform } from "react-native";
import ProfileNavigator from "./ProfileNavigator";
import { setSocket, uploadExpoPushToken } from "../store/actions/auth";
import * as Notifications from "expo-notifications";

const BottomTab = createBottomTabNavigator();

const TabNavigator = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const socket = useSelector((state) => state.auth.socket);
  const hasInitChats = useSelector((state) => state.chats.hasInit);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [toNavigateChatRoomUserId, setToNavigateChatRoomUserId] = useState();

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false,
  //   }),
  // });

  useEffect(() => {
    if (toNavigateChatRoomUserId && hasInitChats) {
      setToNavigateChatRoomUserId(null);
      props.navigation.navigate("chatRoom", {
        userId: toNavigateChatRoomUserId,
      });
    }
  }, [toNavigateChatRoomUserId, hasInitChats]);

  useEffect(() => {
    let hasMounted = false;

    registerForPushNotificationsAsync().then((token) => {
      if (!hasMounted) {
        setExpoPushToken(token);
      }
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        if (data.type === "chatRoom") {
          setToNavigateChatRoomUserId(data.userId);
        }
      }
    );

    return () => {
      subscription.remove();
      hasMounted = true;
    };
  }, []);

  useEffect(() => {
    if (
      token &&
      jwtDecode(token).exp > Date.now() / 1000 &&
      userId &&
      (!Constants.isDevice || expoPushToken)
    ) {
      dispatch(uploadExpoPushToken(expoPushToken)).then(() => {
        dispatch(fetchChats()).then(() => {
          const newSocket = io(axios.defaults.baseURL, {
            extraHeaders: {
              Authorization: "Bearer " + token,
            },
          });
          newSocket.emit("subscribe", { token });

          newSocket.on(
            "roomAdded",
            ({ roomId, userId, userImage, username, messages }) => {
              dispatch(addChat(roomId, userId, username, userImage, messages));
            }
          );
          dispatch(setSocket(newSocket));
        });
      });
    }
  }, [dispatch, userId, token, expoPushToken]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.emit("unsubscribe", { token });
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: getThemeColor("primary", props.theme),
        tabBarInactiveTintColor: getThemeColor("idle", props.theme),
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "7%" : "10%",
          backgroundColor: getThemeColor("main", props.theme),
        },
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
        options={{
          tabBarIcon: ({ color, size }) => (
            <MessageButton color={color} size={size} />
          ),
          // tabBarStyle: (() => {
          //   const routeName = getFocusedRouteNameFromRoute(route);
          //   if (routeName === "chatRoom") {
          //     return { display: "none" };
          //   }
          // })(),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileButton color={color} size={size} />
          ),

          // tabBarStyle: (() => {
          //   const routeName = getFocusedRouteNameFromRoute(route);
          //   if (routeName === "settings") {
          //     return { display: "none" };
          //   }
          //   if (routeName === "account") {
          //     return { display: "none" };
          //   }
          //   if (routeName === "detail") {
          //     return { display: "none" };
          //   }
          //   if (routeName === "detail") {
          //     return { display: "none" };
          //   }
          // })(),
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    // alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
