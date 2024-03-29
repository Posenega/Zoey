import React, { useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
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
import Image from "../components/CustomImage";

function ProfileScreen(props) {
  const styles = getStyles(props.theme);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const theme = props.theme;

  useEffect(() => {
    dispatch(fetchUserBooks());

    props.navigation.setOptions({
      headerRight: () => (
        <SettingsButton
          style={{ marginRight: 18 }}
          color={getThemeColor("text", theme)}
          onPress={() => props.navigation.navigate("settings")}
        />
      ),
    });
    // dispatch(getUser(userId));
  }, [theme]);
  const packagesIsSelected = useSelector(
    (state) => state.bookPackageSelector.mySelected === "packages"
  );
  const myBooks = useSelector((state) => {
    if (packagesIsSelected) return state.packages.userPackages;
    return state.books.userBooks;
  });
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const image = useSelector((state) => state.auth.image);
  const city = useSelector((state) => state.auth.city);
  console.log(city);

  return (
    <View style={SharedStyles.screen}>
      <View style={styles.header}>
        {image ? (
          <Image style={styles.image} image={image} />
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
      <View style={styles.body}>
        <BookPackageSelector style={{ marginTop: 10 }} mySelected />

        {myBooks.length <= 0 ? (
          <NoData
            firstLine={
              packagesIsSelected
                ? "You don't have any Package yet"
                : "You don't have any Book yet"
            }
            secondLine="Go create Some!"
          />
        ) : (
          <Books
            isPackage={packagesIsSelected}
            isMine
            books={myBooks}
            navigation={props.navigation}
          />
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
