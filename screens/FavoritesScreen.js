import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import { useHeaderHeight } from "@react-navigation/elements";

import Books from "../components/Books";
import SharedStyles from "../constants/SharedStyles";
import { fetchFavoriteBooks } from "../store/actions/books";
import Colors, { getThemeColor } from "../constants/Colors";
import NoData from "../components/NoData";
import BookPackageSelector from "../components/BookPackageSelector";

function FavoritesScreen({ navigation, theme }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteBooks());
  }, []);
  const packagesIsSelected = useSelector(
    (state) => state.bookPackageSelector.selected === "packages"
  );
  const displayedBooks = useSelector((state) => {
    if (packagesIsSelected) return state.packages.favoritePackages;
    return state.books.favoriteBooks;
  });

  const headerHeight = useHeaderHeight();

  return (
    <View
      style={{
        ...SharedStyles.screen,
        paddingTop: headerHeight,
      }}
    >
      <BookPackageSelector style={{ marginTop: 5 }} />
      {displayedBooks.length <= 0 ? (
        <NoData firstLine="No Favorites." secondLine="Go Add Some!" />
      ) : (
        <Books
          books={displayedBooks}
          navigation={navigation}
          isPackage={packagesIsSelected}
        />
      )}
    </View>
  );
}

export const screenOptions = {
  headerTitle: "Your Favorites",
};

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(FavoritesScreen);
