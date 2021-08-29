import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setBooksFavoritesSelected,
  setBooksMySelected,
  setBooksSelected,
  setPackagesFavoritesSelected,
  setPackagesMySelected,
  setPackagesSelected,
  setBooksSoldSelected,
  setPackagesSoldSelected,
} from "../store/actions/bookPackageSelector";
import { getThemeColor } from "../constants/Colors";
function BookPackageSelector({
  theme,
  style,
  mySelected,
  favoritesSelected,
  soldSelected,
}) {
  const styles = getStyles(theme);
  const packagesIsSelected = useSelector((state) => {
    let selected = "selected";
    if (mySelected) selected = "mySelected";
    else if (favoritesSelected) selected = "favoritesSelected";
    else if (soldSelected) selected = "soldSelected";
    return state.bookPackageSelector[selected] === "packages";
  });
  const dispatch = useDispatch();
  return (
    <View
      style={{
        ...style,
        flexDirection: "row",
        alignItems: "flex-end",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (mySelected) {
            dispatch(setBooksMySelected());
          } else if (favoritesSelected) {
            dispatch(setBooksFavoritesSelected());
          } else if (soldSelected) {
            dispatch(setBooksSoldSelected());
          } else {
            dispatch(setBooksSelected());
          }
        }}
      >
        <Text
          style={
            !packagesIsSelected
              ? { ...styles.forYouText, ...styles.forYouTextSelected }
              : styles.forYouText
          }
        >
          Books
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (mySelected) {
            dispatch(setPackagesMySelected());
          } else if (favoritesSelected) {
            dispatch(setPackagesFavoritesSelected());
          } else if (soldSelected) {
            dispatch(setPackagesSoldSelected());
          } else {
            dispatch(setPackagesSelected());
          }
        }}
      >
        <Text
          style={
            packagesIsSelected
              ? { ...styles.forYouText, ...styles.forYouTextSelected }
              : styles.forYouText
          }
        >
          Packages
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(BookPackageSelector);

const getStyles = (theme) =>
  StyleSheet.create({
    forYouText: {
      marginRight: 20,
      marginBottom: 10,
      fontFamily: "rubik-bold",
      fontSize: 14,
      color: "grey",
    },
    forYouTextSelected: {
      fontSize: 16,
      color: getThemeColor("text", theme),
    },
  });
