import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { getThemeColor } from "../constants/Colors";

function HorizontalBook(props) {
  const styles = getStyles(props.theme);
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate("detail", {
          id: props.id,
          isPackage: props.isPackage,
          isMine: props.isMine,
          soldBook: props.soldBook,
        })
      }
    >
      <View onStartShouldSetResponder={() => true} style={styles.bookContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.titleText}>
            {props.title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const getStyles = (theme) =>
  StyleSheet.create({
    bookContainer: {
      width: 140,
      height: 220,
      // backgroundColor: 'red',
      marginRight: 15,
      // marginBottom:20
    },
    imageContainer: {
      flex: 9,
      // backgroundColor: 'orange',
      borderRadius: 10,
      overflow: "hidden",
    },
    image: {
      flex: 1,
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
      marginTop: 2.5,
      marginLeft: 5,
    },
    titleText: {
      color: getThemeColor("text", theme),
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(HorizontalBook);
