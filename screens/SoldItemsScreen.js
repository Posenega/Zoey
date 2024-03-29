import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import SharedStyles from "../constants/SharedStyles";
import { getThemeColor } from "../constants/Colors";
import ArrowButton from "../components/Icons/ArrowButton";
import BookPackageSelector from "../components/BookPackageSelector";
import Books from "../components/Books";
import { fetchUserBooks } from "../store/actions/books";
const SoldItemsScreen = (props) => {
  // const packagesIsSelected = useSelector(
  //   (state) =>
  //     state.bookPackageSelector.favoritesSelected === "packages"
  // );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserBooks(true));
  }, []);

  const selectedIsPackage = useSelector(
    (state) => state.bookPackageSelector.soldSelected === "packages"
  );

  const soldBooks = useSelector((state) =>
    selectedIsPackage ? state.packages.soldPackages : state.books.soldBooks
  );
  const styles = getStyles(props.theme);
  return (
    <View style={SharedStyles.screen}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View style={{ marginRight: 10 }}>
            <ArrowButton
              onPress={() => {
                props.navigation.goBack();
              }}
              back
              size={24}
              color={getThemeColor("text", props.theme)}
            />
          </View>
          <Text style={styles.topHeaderText}>Sold Items</Text>
        </View>
        <BookPackageSelector style={{ marginTop: 5 }} soldSelected />
        <Books
          books={soldBooks}
          navigation={props.navigation}
          soldBooks
          isPackage={selectedIsPackage}
        />
      </View>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    header: {
      paddingTop: "10%",
      flex: 1,
      width: "100%",
    },
    topHeader: {
      flexDirection: "row",
      height: 55,
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    topHeaderText: {
      fontFamily: "rubik-bold",
      fontSize: 18,
      color: getThemeColor("text", theme),
    },
  });

export const screenOptions = {
  headerTitle: "Sold Items",
};

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(SoldItemsScreen);
