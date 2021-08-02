import React from "react";
import axios from "axios";
import { View, Text, Image, StyleSheet } from "react-native";
import IconPlaceholder from "./IconPlaceholder";
import ArrowButton from "./Icons/ArrowButton";
import MenuButton from "./Icons/MenuButton";
import { connect } from "react-redux";
import { getThemeColor } from "../constants/Colors";
import IconPlaceholder from "../components/IconPlaceholder";

function DirectMessageHeader({ username, navigation, theme, userImage }) {
  const styles = getStyles(theme);
  return (
    <View style={styles.header}>
      <View style={{ marginRight: 10 }}>
        <ArrowButton
          SvgStyle={{ transform: [{ rotateY: "180deg" }] }}
          onPress={() => navigation.goBack()}
          size={20}
          color={getThemeColor("text", theme)}
        />
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          {userImage ? (
            <Image
              resizeMode='cover'
              style={{ flex: 1 }}
              source={{
                uri: `${axios.defaults.baseURL}/${userImage}`,
              }}
            />
          ) : (
            <IconPlaceholder />
          )}
        </View>
      </View>
      <View style={styles.reveiverInfo}>
        <Text style={styles.reveiverName}>{username}</Text>
        {/* <Text style={styles.status}>Online</Text> */}
      </View>
      <View style={styles.menu}>
        <MenuButton color={getThemeColor("text", theme)} />
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    header: {
      paddingTop: "10%",
      paddingHorizontal: 18,
      flexDirection: "row",
      width: "100%",
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: getThemeColor("main", theme),
    },
    imageContainer: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      borderRadius: 60,
      height: 44,
      width: 44,
      overflow: "hidden",
    },
    reveiverInfo: {
      flex: 3,
      height: 40,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginLeft: 10,
    },
    menu: {
      flex: 1 / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    reveiverName: {
      fontSize: 14,
      color: getThemeColor("text", theme),
    },
    status: {
      fontSize: 12,
      color: "#999999",
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(DirectMessageHeader);
