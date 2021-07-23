import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CustomTextInput from "./CustomTextInput";
import ImageIcon from "./Icons/ImageIcon";
import * as ExpoImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { getThemeColor } from "../constants/Colors";

function ImagePicker(props) {
  const styles = StyleSheet.create({
    imageSelector: {
      borderWidth: props.error ? 2 : null,
      borderColor: props.error ? "#E24949" : null,
      backgroundColor: getThemeColor("formBackground", props.theme),
      paddingHorizontal: 12,
      height: 44,
      width: "100%",
      borderRadius: 10,
      marginTop: 10,
      alignItems: "center",
      flexDirection: "row",
    },
    imageSelected: {
      backgroundColor: getThemeColor("background", props.theme),
      paddingHorizontal: 12,
      height: 44,
      width: "100%",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: getThemeColor("inputBorder", props.theme),
      marginTop: 10,
      alignItems: "center",
      flexDirection: "row",
    },
    text: {
      marginLeft: 10,
      fontSize: 12,
      color: props.error
        ? "#E24949"
        : getThemeColor("placeholder", props.theme),
    },
    textSelected: {
      marginLeft: 10,
      fontSize: 12,
      color: getThemeColor("text", props.theme),
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
      color: getThemeColor("placeholder", props.theme),
    },
  });

  const [image, setImage] = useState(props.value || null);
  const pickImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: props.aspect,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      props.sendData(result.uri);
    }
  };

  useEffect(() => {
    props.onChange(image);
  }, [image]);

  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
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

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(ImagePicker);
