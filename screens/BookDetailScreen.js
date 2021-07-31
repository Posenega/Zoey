import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useSelector, useDispatch, connect, useStore } from "react-redux";
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
import { addChat, requestAddChat } from "../store/actions/chats";

function BookDetailScreen(props) {
  const styles = getStyles(props.theme);
  const id = props.route.params.id;
  const { getState, subscribe } = useStore();

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  const [displayedBook, setDisplayedBook] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [isChatting, setIsChatting] = useState(null);

  const initialIsChatting = useRef();

  useEffect(() => {
    dispatch(fetchFavoriteBooks());
  }, []);

  const unsubscribe = useRef();

  useEffect(() => {
    unsubscribe.current = subscribe(() => {
      const state = getState();

      const book = state.books.books.find((book) => book?._id === id);
      setDisplayedBook(book);
      setIsFavorite(state.books.favoriteBooks.some((b) => b?._id === book._id));
      const chatting =
        state.chats.myChats.findIndex((chat) => {
          return chat.userId === book.creator;
        }) >= 0;

      if (initialIsChatting.current === undefined) {
        initialIsChatting.current = chatting;
      }
      setIsChatting(chatting);
    });
    return unsubscribe.current;
  }, []);

  useEffect(() => {
    if (isChatting && !initialIsChatting.current) {
      props.navigation.navigate("chatRoom", {
        userId: displayedBook.creator,
      });
    }
  }, [isChatting]);

  const bookType = () => {
    if (displayedBook.type === "sell") {
      return "For sale";
    } else if (displayedBook.type === "exchange") {
      return "Exchange";
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {displayedBook && isFavorite !== null ? (
        <>
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
                  color={
                    isFavorite ? "red" : getThemeColor("idle", props.theme)
                  }
                />
              </TouchableOpacity>
              {userId === displayedBook.creator ? (
                <View style={{ marginLeft: 15, flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      unsubscribe.current();

                      dispatch(deleteBook(displayedBook._id)).then(() =>
                        props.navigation.goBack()
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
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              {displayedBook.isPackage && (
                <Badge
                  style={styles.badge}
                  color={getThemeColor("primary", props.theme)}
                  backgroundColor="#FFF0C1"
                >
                  Package
                </Badge>
              )}
              {displayedBook.isForSchool && (
                <Badge
                  style={styles.badge}
                  color={getThemeColor("primary", props.theme)}
                  backgroundColor="#FFF0C1"
                >
                  For School
                </Badge>
              )}
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
            {displayedBook.categories.length > 1 && (
              <Text>Categories: {displayedBook.categories.join(", ")}</Text>
            )}
            <Text style={styles.description}>{displayedBook.description}</Text>
            <View style={styles.footerContainer}>
              {displayedBook.type === "sell" && displayedBook.price && (
                <View style={styles.price}>
                  <Text>{displayedBook.price + " L.L"}</Text>
                </View>
              )}
              {displayedBook.creator !== userId && (
                <TouchableOpacity
                  onPress={() => {
                    if (isChatting) {
                      props.navigation.navigate("chatRoom", {
                        userId: displayedBook.creator,
                      });
                    } else {
                      dispatch(requestAddChat(displayedBook.creator));
                    }
                  }}
                >
                  <View style={styles.messageContainer}>
                    <MessageButton size={20} color="white" />
                    <Text style={styles.message}>Messages</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      ) : (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      )}
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
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
