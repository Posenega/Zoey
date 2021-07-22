import React from 'react';
import axios from 'axios';
import {
  View,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Book from './Book';
import HorizontalBook from './HorizontalBook';

export default function Books({ books, navigation, isHorizontal }) {
  const renderBook = (itemData) => {
    const book = itemData.item;
    let BookComponent = () => (
      <Book
        id={book?._id}
        color={book.color}
        backgroundColor={book.backgroundColor}
        title={book.title}
        category={book.category}
        image={`${axios.defaults.baseURL}/${book.imageUrl}`}
        author={book.author}
        navigation={navigation}
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
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={
        !isHorizontal
          ? { flex: 1 }
          : { flex: 1, paddingHorizontal: '4.8%' }
      }
      horizontal={isHorizontal}
      data={books}
      renderItem={renderBook}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
