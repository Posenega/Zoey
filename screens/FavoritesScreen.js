import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useHeaderHeight } from "@react-navigation/elements";

import Books from "../components/Books";
import SharedStyles from "../constants/SharedStyles";
import { fetchFavoriteBooks } from "../store/actions/books";

export default function FavoritesScreen({ navigation }) {
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
      <Books books={displayedBooks} navigation={navigation} />
    </View>
  );
}

export const screenOptions = {
  headerTitle: "Your Favorites",
};
