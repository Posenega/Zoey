import React from "react";
import Image from "../components/CustomImage";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

import { connect } from "react-redux";
import moment from "moment-timezone";
import Colors, { getThemeColor } from "../constants/Colors";
import IconPlaceholder from "./IconPlaceholder";
import Divider from "./Divider";

const MessageInfoContainer = (props) => {
  const styles = getStyles(props.theme);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate("chatRoom", { chatId: props.chatId })
      }
    >
      <View style={styles.bigContainer}>
        <View style={styles.profileMessageContainer}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              {props.userImage ? (
                <Image
                  style={{ flex: 1 }}
                  resizeMode="cover"
                  image={props.userImage}
                />
              ) : (
                <IconPlaceholder />
              )}
            </View>
          </View>
          <View style={styles.discussionInfo}>
            <Text style={styles.userName}>{props.name}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {props.lastMessageText || ""}
            </Text>
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.time}>
              {moment(props.lastMessageCreatedAt)
                .tz("Asia/Beirut")
                .format(
                  new Date(props.lastMessageCreatedAt).setHours(0, 0, 0, 0) ===
                    new Date().setHours(0, 0, 0, 0)
                    ? "hh:mm A"
                    : "D MMM YYYY"
                )}
            </Text>
            {/* <View style={styles.unreadCountContainer}>
              <Text style={styles.unreadCount}>3</Text>
            </View> */}
          </View>
        </View>
        <Divider />
      </View>
    </TouchableWithoutFeedback>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    bigContainer: {
      flexDirection: "column",
    },
    profileMessageContainer: {
      width: "100%",
      height: 60,
      flexDirection: "row",
      overflow: "hidden",
    },
    profilePictureContainer: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    profilePicture: {
      height: 55,
      width: 55,
      borderRadius: 60,
      overflow: "hidden",
    },

    discussionInfo: {
      flex: 3.8,
      height: "100%",
      paddingLeft: 10,
      flexDirection: "column",
    },
    userName: {
      fontSize: 14,
      letterSpacing: 0.5,
      color: getThemeColor("text", theme),
    },
    lastMessage: {
      color: "#999999",
      fontSize: 12,
      marginTop: 5,
    },
    recentInfo: {
      height: "100%",
      flexDirection: "column",
      alignItems: "flex-end",
      // justifyContent: 'space-between',
    },
    time: {
      color: "#999999",
      fontSize: 12,
      letterSpacing: 1,
      marginBottom: 8,
    },
    unreadCountContainer: {
      height: 25,
      width: 25,
      backgroundColor: getThemeColor("primary", theme),
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    unreadCount: {
      color: "white",
      fontSize: 16,
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(MessageInfoContainer);
