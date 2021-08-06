import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import { useHeaderHeight } from "@react-navigation/elements";

import Books from "../components/Books";
import SharedStyles from "../constants/SharedStyles";
import { fetchFavoriteBooks } from "../store/actions/books";
import Colors, { getThemeColor } from "../constants/Colors";
import NoData from "../components/NoData";

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
      }}>
      {displayedBooks.length <= 0 ? (
        <NoData firstLine="No Favorites." secondLine="Go Add Some!" />
      ) : (
        <Books books={displayedBooks} navigation={navigation} />
      )}
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({});

export const screenOptions = {
  headerTitle: "Your Favorites",
};

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(FavoritesScreen);
