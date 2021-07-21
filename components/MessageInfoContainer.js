import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../constants/Colors";
import IconPlaceholder from "./IconPlaceholder";

const MessageInfoContainer = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.navigation.navigate("chatRoom")}
    >
      <View style={styles.bigContainer}>
        <View style={styles.profileMessageContainer}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              {props.imageUrl ? (
                <Image
                  resizeMode="cover"
                  style={{ flex: 1 }}
                  source={{
                    uri: props.imageUrl,
                  }}
                />
              ) : (
                <IconPlaceholder />
              )}
            </View>
          </View>
          <View style={styles.discussionInfo}>
            <Text style={styles.userName}>{props.name}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              Is your book still available? Is your book still available? Is
              your book still available?
            </Text>
          </View>
          <View style={styles.recentInfo}>
            <Text style={styles.time}>10:00PM</Text>
            <View style={styles.unreadCountContainer}>
              <Text style={styles.unreadCount}>3</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.ghostDivider} />
          <View style={styles.divider} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MessageInfoContainer;

const styles = StyleSheet.create({
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
  },
  lastMessage: {
    color: "#999999",
    fontSize: 12,
    marginTop: 5,
  },
  recentInfo: {
    flex: 1.2,
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
    backgroundColor: Colors.primaryColor,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadCount: {
    color: "white",
    fontSize: 16,
  },
  ghostDivider: {
    flex: 1,
  },
  divider: {
    marginTop: 5,
    marginBottom: 15,
    height: 1,
    backgroundColor: "#D9D9D9",
    flex: 5,
    flexDirection: "row",
  },
});
