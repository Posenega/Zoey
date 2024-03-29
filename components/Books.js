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
import { connect, useDispatch } from "react-redux";
import { getThemeColor } from "../constants/Colors";
import { fetchPackages } from "../store/actions/packages";
import { fetchBooks } from "../store/actions/books";

function Books({
  refreshControl,
  books,
  navigation,
  isHorizontal,
  isLoading,
  theme,
  isPackage,
  isMine,
  onRefresh,
  soldBooks,
}) {
  const dispatch = useDispatch();
  const renderBook = (itemData) => {
    const book = itemData.item;

    let BookComponent = () => (
      <Book
        id={book?._id}
        color={book.color}
        backgroundColor={book.backgroundColor}
        title={book.title}
        category={book.categories[0]}
        image={book.image}
        author={book.author}
        navigation={navigation}
        grade={book.grade}
        isPackage={isPackage}
        isForSchool={book.isForSchool}
        isMine={isMine}
        soldBook={soldBooks}
      />
    );
    if (isHorizontal) {
      BookComponent = () => (
        <HorizontalBook
          title={book.title}
          image={book.image}
          id={book?._id}
          navigation={navigation}
          isPackage={isPackage}
          isMine={isMine}
          soldBook={soldBooks}
        />
      );
    }
    return <BookComponent />;
  };
  return isLoading ? (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <ActivityIndicator color={getThemeColor("text", theme)} />
      {Platform.OS === "ios" && (
        <Text style={{ color: getThemeColor("text", theme) }}>Loading...</Text>
      )}
    </View>
  ) : books.length <= 0 ? (
    <NoData
      firstLine={
        isPackage ? "There is no Packages Yet" : "There is no Books Yet"
      }
      secondLine="Be the First to add Some!"
      onRefresh={onRefresh}
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
