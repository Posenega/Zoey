import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import CustomTextInput from "./CustomTextInput";
import ImageIcon from "./Icons/ImageIcon";
import * as ExpoImagePicker from "expo-image-picker";

export default function ImagePicker(props) {
  const [image, setImage] = useState(props.value || null);
  const pickImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
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
    <>
      <TouchableOpacity onPress={pickImage}>
        <View style={image ? styles.imageSelected : styles.imageSelector}>
          <ImageIcon color={image ? "#2b2b2b" : "#999999"} />
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
  imageSelected: {
    backgroundColor: "#ededed",
    paddingHorizontal: 12,
    height: 44,
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2b2b2b",
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    marginLeft: 10,
    fontSize: 12,
    color: "#999999",
  },
  textSelected: {
    marginLeft: 10,
    fontSize: 12,
    color: "#2b2b2b",
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
    color: "#999999",
  },
});
