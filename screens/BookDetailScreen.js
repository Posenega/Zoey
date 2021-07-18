import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Badge from "../components/Badge";
import MessageButton from "../components/Icons/MessageButton";
import Colors from "../constants/Colors";
import FavoriteButton from "../components/Icons/FavoriteButton";
import BackButton from "../components/Icons/BackButton";
import {
  fetchFavoriteBooks,
  requestAddFavoriteBook,
  requestRemoveFavoriteBook,
} from "../store/actions/books";

export default function BookDetailScreen(props) {
  const id = props.route.params.id;

  const dispatch = useDispatch();
  const displayedBook = useSelector((state) =>
    state.books.books.find((book) => book.id === id)
  );

  useEffect(() => {
    dispatch(fetchFavoriteBooks());
  }, []);

  const isFavorite = useSelector((state) =>
    state.books.favoriteBooks.some((book) => book._id === displayedBook._id)
  );

  const bookType = () => {
    if (displayedBook.type === "sell") {
      return "For sale";
    } else if (displayedBook.type === "exchange") {
      return "Exchange";
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <View
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            zIndex: 1,
            left: 10,
            top: 50,
          }}
        >
          <BackButton
            onPress={() => props.navigation.goBack()}
            size={40}
            color="white"
          />
        </View>
        <Image
          style={styles.bluredImage}
          resizeMode="cover"
          blurRadius={8}
          source={{
            uri: `${axios.defaults.baseURL}/${displayedBook.imageUrl}`,
          }}
        />
        <View style={styles.image}>
          <Image
            style={{ flex: 1 }}
            source={{
              uri: `${axios.defaults.baseURL}/${displayedBook.imageUrl}`,
            }}
          />
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.headerContainer}>
          <View style={{ flex: 6 }}>
            <Text numberOfLines={2} style={styles.title}>
              {displayedBook.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(
                isFavorite
                  ? requestRemoveFavoriteBook(id)
                  : requestAddFavoriteBook(id)
              );
            }}
          >
            <FavoriteButton size={20} color={isFavorite ? "red" : "#C9C9C9"} />
          </TouchableOpacity>
        </View>
        <Text numberOfLines={1} style={styles.author}>
          {displayedBook.author}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Badge
            style={styles.badge}
            color={Colors.primaryColor}
            backgroundColor="#FFF0C1"
          >
            {bookType()}
          </Badge>
        </View>
        <Text style={styles.description}>{displayedBook.description}</Text>
        <View style={styles.footerContainer}>
          <View style={styles.price}>
            <Text>50,000L.L.</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Messages")}
          >
            <View style={styles.messageContainer}>
              <MessageButton size={20} color="white" />
              <Text style={styles.message}>Messages</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export const screenOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -10,
  },
  backButtonContainer: {},
  detailsContainer: {
    flex: 1.3,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  bluredImage: {
    width: "100%",
    height: "100%",
  },
  image: {
    height: 224,
    width: 165,
    borderRadius: 10,
    overflow: "hidden",
    position: "absolute",
  },
  headerContainer: {
    flexDirection: "row",
  },
  title: {
    fontFamily: "rubik-bold",
    fontSize: 14,
  },
  author: {
    fontSize: 10,
    color: "#979797",
    marginTop: 5,
  },
  badge: {
    maxWidth: 75,
    marginRight: 5,
    height: 22,
    marginTop: 24,
  },
  description: {
    flex: 1,
    marginTop: 12,
  },
  footerContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  price: {
    paddingHorizontal: 18,
    paddingVertical: 13,
    backgroundColor: "#EDEDED",
    borderRadius: 10,
  },
  messageContainer: {
    width: 130,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginLeft: 15,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
  },
  message: {
    color: "white",
  },
});
