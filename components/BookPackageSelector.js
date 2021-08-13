import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setBooksSelected,
  setPackagesSelected,
} from "../store/actions/bookPackageSelector";
import { getThemeColor } from "../constants/Colors";
function BookPackageSelector({ theme, style }) {
  const styles = getStyles(theme);
  const packagesIsSelected = useSelector(
    (state) => state.bookPackageSelector.selected === "packages"
  );
  const dispatch = useDispatch();
  return (
    <View style={{ ...style, flexDirection: "row", alignItems: "flex-end" }}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setBooksSelected());
        }}>
        <Text
          style={
            !packagesIsSelected
              ? { ...styles.forYouText, ...styles.forYouTextSelected }
              : styles.forYouText
          }>
          Books
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(setPackagesSelected());
        }}>
        <Text
          style={
            packagesIsSelected
              ? { ...styles.forYouText, ...styles.forYouTextSelected }
              : styles.forYouText
          }>
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
