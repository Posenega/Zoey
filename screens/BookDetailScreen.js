import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import Divider from "../components/Divider";
import Categories from "../constants/Categories";
import { useSelector, useDispatch, connect, useStore } from "react-redux";
import Badge from "../components/Badge";
import MessageButton from "../components/Icons/MessageButton";
import Colors, { getThemeColor } from "../constants/Colors";
import FavoriteButton from "../components/Icons/FavoriteButton";
import BackButton from "../components/Icons/BackButton";
import SchoolSubjects from "../constants/SchoolSubjects";
import {
  deleteBook,
  fetchFavoriteBooks,
  requestAddFavoriteBook,
  requestRemoveFavoriteBook,
  requestUpdateBook,
} from "../store/actions/books";
import DeleteButton from "../components/Icons/DeleteButton";
import EditButton from "../components/Icons/EditButton";
import { modalSetEditMode } from "../store/actions/addBookModal";
import { addChat, requestAddChat } from "../store/actions/chats";
import {
  requestDeletePackage,
  requestRemoveFavoritePackage,
  requestAddFavoritePackage,
  requestUpdatePackage,
} from "../store/actions/packages";
import {
  BOOKS_PERMISSIONS_TYPES,
  PACKAGES_PERMISSIONS_TYPES,
} from "../constants/permissions";

function BookDetailScreen(props) {
  const styles = getStyles(props.theme);
  const { id, isPackage, isMine, soldBook } = props.route.params || {};
  const userType = useSelector((state) => state.auth.type);

  const { getState, subscribe } = useStore();

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  const [displayedBook, setDisplayedBook] = useState();
  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    dispatch(fetchFavoriteBooks());
  }, []);

  const unsubscribe = useRef();
  const isChatting = useRef();

  useEffect(() => {
    unsubscribe.current = subscribe(() => {
      const state = getState();
      const selected = isPackage ? "packages" : "books";
      let secondSelected = selected;
      if (isMine) secondSelected = isPackage ? "userPackages" : "userBooks";
      if (soldBook) secondSelected = isPackage ? "soldPackages" : "soldBooks";

      const book = state[selected][secondSelected].find(
        (book) => book?._id === id
      );

      setDisplayedBook(book);
      setIsFavorite(
        isPackage
          ? state.packages.favoritePackages.some((p) => p?._id === book._id)
          : state.books.favoriteBooks.some((b) => b?._id === book._id)
      );
      isChatting.current =
        state.chats.myChats.findIndex((chat) => {
          return chat.userId === book.creator._id;
        }) >= 0;
    });
    return unsubscribe.current;
  }, []);

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
              resizeMode="cover"
              style={styles.bluredImage}
              blurRadius={8}
              uri={`${axios.defaults.baseURL}/${displayedBook.imageUrl}`}
            />
            <View style={styles.image}>
              <Image
                style={{ flex: 1 }}
                uri={`${axios.defaults.baseURL}/${displayedBook.imageUrl}`}
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
              {!(userId === displayedBook.creator) && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      isFavorite
                        ? isPackage
                          ? requestRemoveFavoritePackage(id)
                          : requestRemoveFavoriteBook(id)
                        : isPackage
                        ? requestAddFavoritePackage(id)
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
              )}
              {(userId === displayedBook.creator ||
                (isPackage
                  ? PACKAGES_PERMISSIONS_TYPES.includes(userType)
                  : BOOKS_PERMISSIONS_TYPES.includes(userType))) && (
                <View style={{ marginLeft: 15, flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      unsubscribe.current();

                      dispatch(
                        isPackage
                          ? requestDeletePackage(displayedBook._id)
                          : deleteBook(displayedBook._id)
                      ).then(() => props.navigation.goBack());
                    }}
                  >
                    <DeleteButton color={getThemeColor("idle", props.theme)} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text numberOfLines={1} style={styles.author}>
              {displayedBook.author
                ? displayedBook.author
                : displayedBook.grade}
            </Text>
            <Divider style={{ marginBottom: 12, marginTop: 12 }} fullDivider />
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              {displayedBook.isPackage && (
                <Badge
                  style={styles.badge}
                  color={getThemeColor("primary", props.theme)}
                  backgroundColor={getThemeColor(
                    "badgeBackground",
                    props.theme
                  )}
                >
                  Package
                </Badge>
              )}
              {displayedBook.isForSchool && (
                <Badge
                  style={styles.badge}
                  color={getThemeColor("primary", props.theme)}
                  backgroundColor={getThemeColor(
                    "badgeBackground",
                    props.theme
                  )}
                >
                  For School
                </Badge>
              )}
              {displayedBook.type !== "sell" && (
                <Badge
                  style={styles.badge}
                  color={getThemeColor("primary", props.theme)}
                  backgroundColor={getThemeColor(
                    "badgeBackground",
                    props.theme
                  )}
                >
                  Exchange
                </Badge>
              )}
              <Badge
                style={styles.badge}
                color={getThemeColor("primary", props.theme)}
                backgroundColor={getThemeColor("badgeBackground", props.theme)}
              >
                {displayedBook.condition.charAt(0).toUpperCase() +
                  displayedBook.condition.slice(1)}
              </Badge>
            </View>
            {isPackage && (
              <View>
                <Text style={styles.categoriText}>
                  Categorie(s) Included in This Package:
                </Text>
                <Text style={styles.categories}>
                  {displayedBook.categories
                    .map((category) => {
                      const foundCat = displayedBook.isForSchool
                        ? SchoolSubjects.find((cat) => cat.value == category)
                            .label
                        : Categories.find((cat) => cat.value == category).label;
                      return foundCat;
                    })
                    .join(", ")}
                </Text>

                <Divider
                  fullDivider
                  style={{ marginBottom: 10, marginTop: 10 }}
                />
              </View>
            )}
            <Text style={styles.description}>{displayedBook.description}</Text>
            <View style={styles.footerContainer}>
              {displayedBook.type === "sell" && displayedBook.price && (
                <View style={styles.price}>
                  <Text>{displayedBook.price + " L.L"}</Text>
                </View>
              )}
              {displayedBook.creator !== userId ? (
                <TouchableOpacity
                  onPress={() => {
                    console.log(isChatting.current);
                    const params = isChatting.current
                      ? {
                          userId: displayedBook.creator._id,
                        }
                      : {
                          pendingChat: {
                            username:
                              displayedBook.creator.firstName +
                              " " +
                              displayedBook.creator.lastName,
                            messages: [],
                            isLoading: false,
                            userImage: displayedBook.creator.imageUrl,
                            userId: displayedBook.creator._id,
                          },
                        };

                    props.navigation.navigate("chatRoom", params);
                  }}
                >
                  <View
                    style={{
                      ...styles.container,
                      ...styles.message,
                    }}
                  >
                    <MessageButton size={20} color="white" />
                    <Text
                      style={{
                        ...styles.containerText,
                        marginLeft: 5,
                      }}
                    >
                      Messages
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                !displayedBook.isSold && (
                  <TouchableOpacity
                    onPress={() => {
                      unsubscribe.current();
                      dispatch(
                        isPackage
                          ? requestUpdatePackage({
                              packageId: id,
                              isSold: true,
                            })
                          : requestUpdateBook({ bookId: id, isSold: true })
                      ).then(props.navigation.goBack());
                    }}
                  >
                    <View style={{ ...styles.container, ...styles.sold }}>
                      <Text style={styles.containerText}>Sold</Text>
                    </View>
                  </TouchableOpacity>
                )
              )}
            </View>
            {/* <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("settings", {
                  screen: "pricing",
                })
              }
            >
              <Text style={styles.alertMessage}>Check Suggested Prices</Text>
            </TouchableOpacity> */}
          </View>
        </>
      ) : (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2b2b2b" />
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
    categoriText: {
      fontFamily: "rubik-medium",
      color: getThemeColor("text", theme),
    },
    categories: {
      fontSize: 12,
      marginLeft: 5,
      color: getThemeColor("text", theme),
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
      maxWidth: 200,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
      paddingHorizontal: 18,
      paddingVertical: 13,
      backgroundColor: "#EDEDED",
      borderRadius: 10,
    },
    container: {
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
    containerText: {
      color: "white",
    },
    alertMessage: {
      fontSize: 10,
      marginTop: 10,
      marginLeft: 5,
      color: "#06c",
      textDecorationLine: "underline",
    },
  });
export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(BookDetailScreen);
