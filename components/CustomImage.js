import React from "react";
import axios from "axios";
import { Image } from "react-native-expo-image-cache";

export default function CustomImage(props) {
  return (
    <Image
      {...props}
      uri={
        props.image
          ? props.image.location ||
            `${axios.defaults.baseURL}/${props.image.path.replace(/\\/g, "/")}`
          : props.uri
      }
    />
  );
}
