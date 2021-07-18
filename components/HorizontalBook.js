import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

export default function HorizontalBook(props) {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate("detail", {
          id: props.id,
        })
      }
    >
      <View onStartShouldSetResponder={() => true} style={styles.bookContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1}>{props.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
  },
});
