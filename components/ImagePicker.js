import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import ImageIcon from "./Icons/ImageIcon";
import * as ExpoImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { getThemeColor } from "../constants/Colors";

function ImagePicker(props) {
  const styles = getStyles(props.error, props.theme);

  const [image, setImage] = useState(props.value || null);

  const pickImage = () => {
    const takeImage = async (choice) => {
      const takeImageFunc =
        choice === "camera"
          ? ExpoImagePicker.launchCameraAsync
          : ExpoImagePicker.launchImageLibraryAsync;

      const result = await takeImageFunc({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: props.aspect,
        quality: 0.2,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    Alert.alert(
      "Take image",
      "From where would you like to take the image?",
      [
        {
          text: "Cancel",
          onPress: () => Promise.resolve("cancel"),
        },
        {
          text: "Camera",
          onPress: () => takeImage("camera"),
        },
        {
          text: "Gallery",
          onPress: () => takeImage("library"),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => "cancel",
      }
    );
  };

  useEffect(() => {
    props.onChange(image);
  }, [image]);

  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
        await ExpoImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
    getPermissions();
  }, []);

  return (
    <>
      <TouchableOpacity onPress={pickImage}>
        <View style={image ? styles.imageSelected : styles.imageSelector}>
          <ImageIcon
            color={
              props.error
                ? "#E24949"
                : image
                ? getThemeColor("text", props.theme)
                : getThemeColor("placeholder", props.theme)
            }
          />
          <Text style={image ? styles.textSelected : styles.text}>
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
      {image && (
        <View style={styles.imagePreview}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
      )}
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </>
  );
}

const getStyles = (error, theme) =>
  StyleSheet.create({
    imageSelector: {
      borderWidth: error ? 2 : null,
      borderColor: error ? "#E24949" : null,
      backgroundColor: getThemeColor("formBackground", theme),
      paddingHorizontal: 12,
      height: 44,
      width: "100%",
      borderRadius: 10,
      marginTop: 10,
      alignItems: "center",
      flexDirection: "row",
    },
    imageSelected: {
      backgroundColor: getThemeColor("background", theme),
      paddingHorizontal: 12,
      height: 44,
      width: "100%",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: getThemeColor("inputBorder", theme),
      marginTop: 10,
      alignItems: "center",
      flexDirection: "row",
    },
    text: {
      marginLeft: 10,
      fontSize: 12,
      color: error ? "#E24949" : getThemeColor("placeholder", theme),
    },
    textSelected: {
      marginLeft: 10,
      fontSize: 12,
      color: getThemeColor("text", theme),
    },
    imagePreview: {
      marginTop: 10,
      width: "100%",
      height: 256,
      alignItems: "center",
    },
    image: { width: 192, height: "100%", borderRadius: 10 },
    errorText: {
      fontSize: 10,
      marginLeft: 10,
      marginTop: 0.5,
      color: getThemeColor("placeholder", theme),
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(ImagePicker);
