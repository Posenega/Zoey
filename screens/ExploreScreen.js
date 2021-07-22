import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import Books from '../components/Books';
import { useSelector, useDispatch } from 'react-redux';
import SharedStyles from '../constants/SharedStyles';
import CustomTextInput from '../components/CustomTextInput';
import Colors from '../constants/Colors';
import FilterButton from '../components/Icons/FilterButton';
import { Modalize } from 'react-native-modalize';
import { fetchBooks, filterBooks } from '../store/actions/books';

export default function ExploreScreen(props) {
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
  const isFiltering = useSelector((state) => {
    return state.books.isFiltering;
  });
  const dispatch = useDispatch();

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
                onChangeText={(text) => dispatch(filterBooks(text))}
                placeholderTextColor='#999999'
                placeholder='Search a title ...'
              />
            </View>
            <TouchableOpacity
              onPress={() => {}}
              style={styles.filterContainer}>
              <View style={styles.filterBox}>
                <FilterButton />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.header}>
          <View style={styles.searchContainer}>
            <CustomTextInput
              style={styles.searchInput}
              onChangeText={(text) => dispatch(filterBooks(text))}
              placeholderTextColor='#999999'
              placeholder='Search a title ...'
            />

            <View style={styles.filterContainer}>
              
            </View>
          </View>
        </View> */}
        {!isFiltering && (
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
          {!isFiltering && (
            <Text style={styles.forYouText}>For You</Text>
          )}
          <Books
            navigation={props.navigation}
            books={isFiltering ? filteredBooks : allBooks}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: '4.8%',
    width: '100%',
    height: 50,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 5,
  },
  filterContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  searchInput: {
    width: '100%',
    marginVertical: 0,
    fontFamily: 'rubik-bold',
  },
  filterBox: {
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 44,
    height: 44,
  },
  trendingNow: {
    height: 270,
  },
  trendingNowText: {
    paddingHorizontal: '4.8%',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'rubik-bold',
    fontSize: 16,
  },
  forYou: {
    paddingHorizontal: '4.8%',
    flex: 1,
    marginTop: 20,
  },
  forYouText: {
    marginBottom: 10,
    fontFamily: 'rubik-bold',
    fontSize: 16,
  },
});

export const screenOptions = {
  headerTitle: 'Explore',
};
