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
import NoData from "../components/NoData";
// import { getUser } from "../store/actions/auth";
import BookPackageSelector from "../components/BookPackageSelector";
import { fetchUserPackages } from "../store/actions/packages";

function ProfileScreen(props) {
  const styles = getStyles(props.theme);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    dispatch(fetchUserBooks());
    dispatch(fetchUserPackages());
    props.navigation.setOptions({
      headerRight: () => (
        <SettingsButton
          style={{ marginRight: 18 }}
          color={getThemeColor("text", props.theme)}
          onPress={() => props.navigation.navigate("settings")}
        />
      ),
    });
    // dispatch(getUser(userId));
  }, []);
  const packagesIsSelected = useSelector(
    (state) => state.bookPackageSelector.selected === "packages"
  );
  const allBooks = useSelector((state) => {
    if (packagesIsSelected) return state.packages.userPackages;
    return state.books.userBooks;
  });
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const imageUrl = useSelector((state) => state.auth.imageUrl);
  return (
    <View style={SharedStyles.screen}>
      <View style={styles.header}>
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
          style={{ ...styles.mediumText, textAlign: "center" }}>
          {firstName} {lastName}
        </Text>
      </View>
      <View style={styles.body}>
        <BookPackageSelector style={{ marginTop: 10 }} />

        {allBooks.length <= 0 ? (
          <NoData
            firstLine={
              packagesIsSelected
                ? "You don't have any Package yet"
                : "You don't have any Book yet"
            }
            secondLine="Go create Some!"
          />
        ) : (
          <Books books={allBooks} navigation={props.navigation} />
        )}
      </View>
    </View>
  );
}

export const profileScreenOptions = {
  headerTitle: "Profile",
};

const getStyles = (theme) =>
  StyleSheet.create({
    header: {
      marginTop: "20%",
      flex: 0.65,
      flexDirection: "column",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    mediumText: {
      width: "85%",
      marginTop: 10,
      fontSize: 16,
      fontFamily: "rubik-medium",
      color: getThemeColor("text", theme),
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

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(ProfileScreen);
