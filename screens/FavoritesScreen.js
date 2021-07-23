import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import { useHeaderHeight } from "@react-navigation/elements";

import Books from "../components/Books";
import SharedStyles from "../constants/SharedStyles";
import { fetchFavoriteBooks } from "../store/actions/books";
import Colors, { getThemeColor } from "../constants/Colors";

function FavoritesScreen({ navigation, theme }) {
  const styles = getStyles(theme);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteBooks());
  }, []);
  const displayedBooks = useSelector((state) => state.books.favoriteBooks);

  const headerHeight = useHeaderHeight();

  return (
    <View
      style={{
        ...SharedStyles.screen,
        paddingTop: headerHeight,
      }}
    >
      {displayedBooks.length <= 0 ? (
        <View style={styles.center}>
          <Text style={styles.text}>No Favorites.</Text>
          <Text style={styles.text}>Go Add Some!</Text>
        </View>
      ) : (
        <Books books={displayedBooks} navigation={navigation} />
      )}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
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

export const screenOptions = {
  headerTitle: "Your Favorites",
};

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(FavoritesScreen);
