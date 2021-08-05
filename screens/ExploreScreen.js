import React, { useState, useEffect, useRef } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Books from "../components/Books";
import { useSelector, useDispatch, connect } from "react-redux";
import CustomTextInput from "../components/CustomTextInput";
import Colors, { getThemeColor } from "../constants/Colors";
import FilterButton from "../components/Icons/FilterButton";
import { fetchBooks, filterBooks } from "../store/actions/books";
import Options from "../components/Options";
import BookFilters from "../components/BookFilters";
import { fetchPackages } from "../store/actions/packages";
function ExploreScreen(props) {
  const styles = getStyles(props.theme);
  useEffect(() => {
    dispatch(fetchPackages());
    dispatch(fetchBooks());
  }, []);
  const headerHeight = useHeaderHeight();
  const [packageIsSelected, setPackageIsSelected] = useState(false);
  const filteredBooks = useSelector((state) => {
    return state.books.filteredBooks;
  });
  const isSearching = useSelector((state) => {
    return state.books.isSearching;
  });
  const packages = useSelector((state) => {
    return state.packages.packages;
  });
  const dispatch = useDispatch();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const openFilters = () => {
    Animated.timing(fadeAnim, {
      toValue: fadeAnim._value === 1 ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          // ...SharedStyles.screen,
          flex: 1,
          paddingTop: headerHeight,
        }}
      >
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.inputContainer}>
              <CustomTextInput
                style={styles.searchInput}
                onChangeText={(text) =>
                  dispatch(filterBooks({ searchTerm: text }))
                }
                placeholderTextColor="#999999"
                placeholder="Search a title..."
              />
            </View>
            <TouchableOpacity
              onPress={openFilters}
              style={styles.filterContainer}
            >
              <View style={styles.filterBox}>
                <FilterButton />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <BookFilters fadeAnim={fadeAnim} />

        {!isSearching && (
          <View style={styles.trendingNow}>
            <Text style={styles.trendingNowText}>Trending Now</Text>
            {filteredBooks.length > 0 ? (
              <Books
                isHorizontal
                navigation={props.navigation}
                books={filteredBooks}
              />
            ) : (
              <View style={styles.noBooks}>
                <Text style={styles.noBooksMessages}>
                  There is no Books Yet
                </Text>
                <Text style={styles.noBooksMessages}>
                  Be the First to add Some!
                </Text>
              </View>
            )}
          </View>
        )}
        <View style={styles.forYou}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            {!isSearching && (
              <TouchableOpacity onPress={() => setPackageIsSelected(false)}>
                <Text
                  style={
                    packageIsSelected
                      ? styles.forYouText
                      : { ...styles.forYouTextSelected, marginRight: 20 }
                  }
                >
                  For You
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                setPackageIsSelected(true);
              }}
            >
              <Text
                style={
                  packageIsSelected
                    ? { ...styles.forYouTextSelected, marginRight: 20 }
                    : styles.forYouText
                }
              >
                Packages
              </Text>
            </TouchableOpacity>
          </View>
          {filteredBooks.length > 0 ? (
            <Books navigation={props.navigation} books={filteredBooks} />
          ) : (
            <View style={styles.noBooks}>
              <Text style={styles.noBooksMessages}>There is no Books Yet</Text>
              <Text style={styles.noBooksMessages}>
                Be the First to add Some!
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    headerContainer: {
      paddingHorizontal: "4.8%",
      width: "100%",
      height: 50,
    },
    header: {
      height: 50,
      flexDirection: "row",
      alignItems: "center",
    },
    inputContainer: {
      flex: 5,
    },
    filterContainer: {
      flex: 1,
      alignItems: "flex-end",
    },
    searchInput: {
      width: "100%",
      marginVertical: 0,
      fontFamily: "rubik-bold",
    },
    filterBox: {
      backgroundColor: getThemeColor("primary", theme),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      width: 44,
      height: 44,
    },
    trendingNow: {
      height: 270,
    },
    trendingNowText: {
      paddingHorizontal: "4.8%",
      marginTop: 15,
      marginBottom: 10,
      fontFamily: "rubik-bold",
      fontSize: 16,
      color: getThemeColor("text", theme),
    },
    forYou: {
      paddingHorizontal: "4.8%",
      flex: 1,
      marginTop: 20,
    },
    forYouText: {
      marginRight: 20,
      marginBottom: 10,
      fontFamily: "rubik-bold",
      fontSize: 14,
      color: "grey",
    },
    forYouTextSelected: {
      marginBottom: 10,
      fontFamily: "rubik-bold",
      fontSize: 16,
      color: getThemeColor("text", theme),
    },
    option: {
      flexDirection: "row",
      marginTop: 15,
      paddingLeft: "4.8%",
    },
    noBooks: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noBooksMessages: {
      color: "#939393",
      fontSize: 15,
      letterSpacing: 1,
      marginBottom: 5,
    },
  });

export const screenOptions = {
  headerTitle: "Explore",
};
export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(ExploreScreen);
