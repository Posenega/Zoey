import React, { useState, useEffect, useRef } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Animated,
  RefreshControl,
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
import BookPackageSelector from "../components/BookPackageSelector";

function ExploreScreen(props) {
  const styles = getStyles(props.theme);
  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const packagesIsSelected = useSelector(
    (state) => state.bookPackageSelector.selected === "packages"
  );

  const isLoading = useSelector((state) => {
    if (packagesIsSelected) return state.packages.isLoading;
    return state.books.isLoading;
  });

  const headerHeight = useHeaderHeight();

  const [refreshing, setRefreshing] = useState(false);

  const filteredBooks = useSelector((state) => {
    if (packagesIsSelected) return state.packages.packages;
    return state.books.filteredBooks;
  });

  const isSearching = useSelector((state) => {
    return state.books.isSearching;
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
        }}>
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
              style={styles.filterContainer}>
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

            <Books
              isLoading={isLoading}
              isHorizontal
              navigation={props.navigation}
              books={filteredBooks}
              isPackage={packagesIsSelected}
            />
          </View>
        )}
        <View style={styles.forYou}>
          {!isSearching && <BookPackageSelector />}

          <Books
            isLoading={isLoading}
            refreshControl={
              <RefreshControl
                title="Reloading..."
                titleColor={getThemeColor("text", props.theme)}
                tintColor={getThemeColor("text", props.theme)}
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  dispatch(
                    packagesIsSelected
                      ? fetchPackages(true)
                      : fetchBooks(true)
                  ).then(() => setRefreshing(false));
                }}
              />
            }
            navigation={props.navigation}
            books={filteredBooks}
            isPackage={packagesIsSelected}
          />
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

    option: {
      flexDirection: "row",
      marginTop: 15,
      paddingLeft: "4.8%",
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
