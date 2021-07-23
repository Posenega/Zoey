import React, { useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import SharedStyles from "../constants/SharedStyles";
import SettingsButton from "../components/Icons/SettingsButton";
import Colors, { getThemeColor } from "../constants/Colors";
import Books from "../components/Books";
import { fetchUserBooks } from "../store/actions/books";
import IconPlaceholder from "../components/IconPlaceholder";
// import { getUser } from "../store/actions/auth";

function ProfileScreen(props) {
  const styles = getStyles(props.theme);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    dispatch(fetchUserBooks());
    // dispatch(getUser(userId));
  }, []);

  const allBooks = useSelector((state) => {
    return state.books.userBooks;
  });
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const imageUrl = useSelector((state) => state.auth.imageUrl);

  return (
    <View style={SharedStyles.screen}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <Text style={styles.headerText}>Profile</Text>
          <SettingsButton
            color={getThemeColor("text", props.theme)}
            onPress={() => props.navigation.navigate("settings")}
          />
        </View>
        <View style={styles.userInfo}>
          {imageUrl ? (
            <Image
              style={styles.image}
              source={{
                uri: `${axios.defaults.baseURL}/${imageUrl}`,
              }}
            />
          ) : (
            <IconPlaceholder size={68} iconSize={60} />
          )}
          <Text
            numberOfLines={1}
            style={{ ...styles.mediumText, textAlign: "center" }}
          >
            {firstName} {lastName}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={{ ...styles.mediumText, textAlign: "left" }}>
          Your Books
        </Text>
        {allBooks.length <= 0 ? (
          <View style={styles.center}>
            <Text style={styles.text}>You don't have any books yet.</Text>
            <Text style={styles.text}>Go create Some!</Text>
          </View>
        ) : (
          <Books books={allBooks} navigation={props.navigation} />
        )}
      </View>
    </View>
  );
}
const getStyles = (theme) =>
  StyleSheet.create({
    header: {
      paddingTop: "10%",
      flex: 1,
      flexDirection: "column",
    },
    mediumText: {
      width: "85%",
      marginTop: 15,
      fontSize: 16,
      fontFamily: "rubik-medium",
      color: getThemeColor("text", theme),
    },
    topHeader: {
      flexDirection: "row",
      height: 55,
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerText: {
      fontFamily: "rubik-bold",
      fontSize: 18,
      color: getThemeColor("text", theme),
    },
    userInfo: {
      flexDirection: "column",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      height: 68,
      width: 68,
      borderRadius: 60,
    },

    body: {
      flex: 2.5,
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    text: {
      color: getThemeColor("text", theme),
      fontFamily: "rubik-bold",
      fontSize: 15,
      marginVertical: 5,
      letterSpacing: 1,
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(ProfileScreen);
