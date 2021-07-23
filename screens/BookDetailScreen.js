import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import Badge from "../components/Badge";
import MessageButton from "../components/Icons/MessageButton";
import Colors, { getThemeColor } from "../constants/Colors";
import FavoriteButton from "../components/Icons/FavoriteButton";
import BackButton from "../components/Icons/BackButton";
import {
  deleteBook,
  fetchFavoriteBooks,
  requestAddFavoriteBook,
  requestRemoveFavoriteBook,
} from "../store/actions/books";
import DeleteButton from "../components/Icons/DeleteButton";
import EditButton from "../components/Icons/EditButton";
import { modalSetEditMode } from "../store/actions/addBookModal";
import { addChat } from "../store/actions/chats";

function BookDetailScreen(props) {
  const styles = getStyles(props.theme);
  const id = props.route.params.id;
  const addBookModalRef = useSelector((state) => state.addBookModal.ref);
  const dispatch = useDispatch();
  const displayedBook = useSelector((state) =>
    state.books.books.find((book) => book?._id === id)
  );
  const userId = useSelector((state) => state.auth.userId);
  useEffect(() => {
    dispatch(fetchFavoriteBooks());
  }, []);

  const isFavorite = useSelector((state) =>
    state.books.favoriteBooks.some((book) => book?._id === displayedBook._id)
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
            <FavoriteButton
              size={20}
              color={isFavorite ? "red" : getThemeColor("idle", props.theme)}
            />
          </TouchableOpacity>
          {userId === displayedBook.creator ? (
            <View style={{ marginLeft: 15, flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    deleteBook(displayedBook._id, props.navigation.goBack)
                  );
                }}
              >
                <DeleteButton color={getThemeColor("idle", props.theme)} />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  dispatch(modalSetEditMode(displayedBook));
                  addBookModalRef?.current?.open();
                }}
                style={{ marginLeft: 15 }}>
                <EditButton />
              </TouchableOpacity> */}
            </View>
          ) : null}
        </View>
        <Text numberOfLines={1} style={styles.author}>
          {displayedBook.author}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Badge
            style={styles.badge}
            color={getThemeColor("primary", props.theme)}
            backgroundColor="#FFF0C1"
          >
            {bookType()}
          </Badge>
          <Badge
            style={styles.badge}
            color={getThemeColor("primary", props.theme)}
            backgroundColor="#FFF0C1"
          >
            {displayedBook.condition}
          </Badge>
        </View>
        <Text style={styles.description}>{displayedBook.description}</Text>
        <View style={styles.footerContainer}>
          {displayedBook.type === "sell" && displayedBook.price && (
            <View style={styles.price}>
              <Text>{displayedBook.price + " L.L"}</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              dispatch(
                addChat(
                  displayedBook.author,
                  Math.random().toString(),
                  displayedBook.author
                )
              );
              props.navigation.navigate(
                "Messages",
                {},
                NavigatedActions.navigate()
              );
            }}
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

const getStyles = (theme) =>
  StyleSheet.create({
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: -20,
    },
    detailsContainer: {
      flex: 1.3,
      backgroundColor: "white",
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      padding: 20,
      backgroundColor: getThemeColor("main", theme),
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
      color: getThemeColor("text", theme),
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
      color: getThemeColor("text", theme),
    },
    footerContainer: {
      flexDirection: "row",
      marginTop: 12,
    },
    price: {
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
      paddingHorizontal: 18,
      paddingVertical: 13,
      backgroundColor: "#EDEDED",
      borderRadius: 10,
    },
    messageContainer: {
      width: 130,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignItems: "center",
      paddingVertical: 13,
      paddingHorizontal: 20,

      backgroundColor: getThemeColor("primary", theme),
      borderRadius: 10,
    },
    message: {
      marginLeft: 5,
      color: "white",
    },
  });
export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(BookDetailScreen);
