import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import Categories from "../constants/Categories";
import { getThemeColor } from "../constants/Colors";
import Badge from "./Badge";

function Book(props) {
  const styles = getStyles(props.theme);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.navigation.navigate("detail", {
          id: props.id,
          isPackage: props.isPackage,
          isMine: props.isMine,
        });
      }}>
      <View
        onStartShouldSetResponder={() => true}
        style={styles.bookContainer}>
        <View style={styles.bookImage}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.details}>
          <Text numberOfLines={2} style={styles.bookTitle}>
            {props.title}
          </Text>
          <Text numberOfLines={1} style={styles.bookAuthor}>
            {props.grade ? props.grade : props.author}
          </Text>

          {!props.isPackage ? (
            <Badge
              style={{ alignSelf: "flex-start", width: null }}
              category={props.category}
              color={props.color}
              backgroundColor={props.backgroundColor}>
              {/* {props.category} */}

              {(props.category &&
                Categories.find(
                  (category) => category.value == props.category
                )?.label) ||
                props.category}
            </Badge>
          ) : (
            props.grade && (
              <Badge
                style={{ alignSelf: "flex-start", width: null }}
                category={props.category}
                color={props.color}
                backgroundColor={props.backgroundColor}>
                {/* {props.category} */}

                {(props.category &&
                  Categories.find(
                    (category) => category.value == props.category
                  )?.label) ||
                  props.grade}
              </Badge>
            )
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const getStyles = (theme) =>
  StyleSheet.create({
    bookContainer: {
      width: 316,
      height: 112,
      marginVertical: 10,
      flexDirection: "row",
    },
    bookImage: {
      flex: 1,
      borderRadius: 10,
      overflow: "hidden",
    },
    image: {
      flex: 1,
    },
    details: {
      flex: 2.7,
      flexDirection: "column",
      paddingHorizontal: 10,
    },
    bookTitle: {
      fontFamily: "rubik-bold",
      fontSize: 12,
      color: getThemeColor("text", theme),
    },
    bookAuthor: {
      fontSize: 10,
      color: "#979797",
      paddingTop: 4,
      paddingBottom: 10,
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(Book);
