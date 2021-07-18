import React, { useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SharedStyles from "../constants/SharedStyles";
import SettingsButton from "../components/Icons/SettingsButton";
import Colors from "../constants/Colors";
import Books from "../components/Books";
import { fetchUserBooks } from "../store/actions/books";
// import { getUser } from "../store/actions/auth";

export default function ProfileScreen(props) {
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
            onPress={() => props.navigation.navigate("settings")}
          />
        </View>
        <View style={styles.userInfo}>
          <Image
            style={styles.image}
            source={{
              uri: `${axios.defaults.baseURL}/${imageUrl}`,
            }}
          />
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
        <Books books={allBooks} navigation={props.navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: Colors.accentColor,
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
});
