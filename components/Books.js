import React from "react";
import axios from "axios";
import {
  Text,
  ActivityIndicator,
  FlatList,
  Platform,
  View,
} from "react-native";
import Book from "./Book";
import HorizontalBook from "./HorizontalBook";
import NoData from "./NoData";
import { connect } from "react-redux";
import { getThemeColor } from "../constants/Colors";

function Books({
  refreshControl,
  books,
  navigation,
  isHorizontal,
  isLoading,
  theme,
}) {
  const renderBook = (itemData) => {
    const book = itemData.item;

    let BookComponent = () => (
      <Book
        id={book?._id}
        color={book.color}
        backgroundColor={book.backgroundColor}
        title={book.title}
        category={book.isPackage ? null : book.categories[0]}
        image={`${axios.defaults.baseURL}/${book.imageUrl}`}
        author={book.author}
        navigation={navigation}
        grade={book.grade}
        isPackage={book.isPackage}
        isForSchool={book.isForSchool}
      />
    );
    if (isHorizontal) {
      BookComponent = () => (
        <HorizontalBook
          title={book.title}
          image={`${axios.defaults.baseURL}/${book.imageUrl}`}
          id={book?._id}
          navigation={navigation}
        />
      );
    }
    return <BookComponent />;
  };
  return isLoading ? (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <ActivityIndicator s color={getThemeColor("text", theme)} />
      {Platform.OS === "ios" && <Text>Loading...</Text>}
    </View>
  ) : books.length <= 0 ? (
    <NoData
      firstLine="There is no Books Yet"
      secondLine="Be the First to add Some!"
    />
  ) : (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={
        !isHorizontal ? { flex: 1 } : { flex: 1, paddingHorizontal: "4.8%" }
      }
      horizontal={isHorizontal}
      data={books}
      renderItem={renderBook}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={refreshControl}
    />
  );
}

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(Books);
