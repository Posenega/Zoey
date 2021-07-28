import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Books from "../components/Books";
import { useSelector, useDispatch, connect } from "react-redux";
import SharedStyles from "../constants/SharedStyles";
import CustomTextInput from "../components/CustomTextInput";
import Colors, { getThemeColor } from "../constants/Colors";
import FilterButton from "../components/Icons/FilterButton";
import { fetchBooks, filterBooks } from "../store/actions/books";
import Options from "../components/Options";
function ExploreScreen(props) {
  const { control, handleSubmit } = useForm();
  const styles = getStyles(props.theme);
  useEffect(() => {
    dispatch(fetchBooks());
  }, []);
  const headerHeight = useHeaderHeight();
  const allBooks = useSelector((state) => {
    return state.books.books;
  });
  const filteredBooks = useSelector((state) => {
    return state.books.filteredBooks;
  });
  const isSearching = useSelector((state) => {
    return state.books.isFiltering;
  });
  const dispatch = useDispatch();
  const [filtering, setFiltering] = useState(false);

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
                placeholder="Search a title ..."
              />
            </View>
            <TouchableOpacity
              onPress={() => setFiltering(!filtering)}
              style={styles.filterContainer}
            >
              <View style={styles.filterBox}>
                <FilterButton />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {filtering && (
          <Controller
            control={control}
            name="filters"
            defaultValue={[]}
            render={({ field: { onChange, value } }) => {
              return (
                <Options
                  style={{ marginBottom: -220 }}
                  multipleAllowed
                  onChange={(val) => {
                    onChange(val);
                    dispatch(filterBooks({ filters: val }));
                  }}
                  value={value}
                  items={[
                    { label: "Action and Adventure", value: "action" },
                    { label: "Classics", value: "classics" },
                    { label: "Comic Book or Graphic Novel", value: "comic" },
                    { label: "Detective and Mystery", value: "detective" },
                    { label: "Fantasy", value: "fantasy" },
                    { label: "Historical Fiction", value: "hFiction" },
                    { label: "Horror", value: "horror" },
                    { label: "Literary Fiction", value: "lFiction" },
                    { label: "Romance", value: "romance" },
                    { label: "Science Fiction (Sci-Fi)", value: "sci-fi" },
                    { label: "Short Stories", value: "s-stories" },
                    { label: "Suspense and Thrillers", value: "thrillers" },
                    { label: "Women's Fiction", value: "wFiction" },
                    {
                      label: "Biographies and Autobiographies",
                      value: "biographies",
                    },
                    { label: "Cookbooks", value: "cookbooks" },
                    { label: "Essays", value: "essays" },
                    { label: "History", value: "history" },
                    { label: "Memoir", value: "memoir" },
                    { label: "Poetry", value: "poetry" },
                    { label: "Self-Help", value: "self-help" },
                    { label: "True Crime", value: "true-crime" },
                  ]}
                />
              );
            }}
            // <Option>Action and Adventure </Option>
            // <Option>Classics</Option>
            // <Option>Comic Book or Graphic Novel </Option>
            // <Option>Detective and Mystery</Option>
            // <Option>Fantasy </Option>
            // <Option>Historical Fiction</Option>
            // <Option>Horror</Option>
            // <Option>Literary Fiction </Option>
            // <Option>Romance </Option>
            // <Option>Science Fiction (Sci-Fi) </Option>
            // <Option>Short Stories</Option>
            // <Option>Suspense and Thrillers</Option>
            // <Option>Women's Fiction </Option>
            // <Option>Biographies and Autobiographies</Option>
            // <Option>Cookbooks</Option>
            // <Option>Essays</Option>
            // <Option>History</Option>
            // <Option>Memoir</Option>
            // <Option>Poetry</Option>
            // <Option>Self-Help </Option>
            // <Option>True Crime </Option>
          />
        )}

        {!isSearching && (
          <View style={styles.trendingNow}>
            <Text style={styles.trendingNowText}>Trending Now</Text>
            <Books
              isHorizontal
              navigation={props.navigation}
              books={allBooks}
            />
          </View>
        )}

        <View style={styles.forYou}>
          {!isSearching && <Text style={styles.forYouText}>For You</Text>}
          <Books
            navigation={props.navigation}
            books={isSearching ? filteredBooks : allBooks}
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
    forYouText: {
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
