import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomTextInput from "./CustomTextInput";
import ImageIcon from "./Icons/ImageIcon";
import * as ExpoImagePicker from "expo-image-picker";

export default function ImagePicker(props) {
  const [image, setImage] = useState(props.value || null);
  const pickImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: props.aspect,
      quality: 1,
    });

    // console.log("result" + result.uri);

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
    <TouchableOpacity onPress={pickImage}>
      <View style={styles.imageSelector}>
        <ImageIcon />
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageSelector: {
    backgroundColor: "#ededed",
    paddingHorizontal: 12,
    height: 44,
    width: "100%",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    marginLeft: 10,
    fontSize: 12,
    color: "#999999",
  },
});
