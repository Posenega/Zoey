import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  useWindowDimensions,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Modalize } from "react-native-modalize";
import Animated from "react-native-reanimated";
import { useHeaderHeight } from "@react-navigation/elements";
// import BottomSheet from "react-native-bottomsheet-reanimated";

import Colors from "../constants/Colors";
import CustomTextInput from "./CustomTextInput";
import { useForm, Controller } from "react-hook-form";
import { addBook } from "../store/actions/books";
import { addRef, modalOpen, modalClose } from "../store/actions/addBookModal";

export default function AddBookModal() {
  const { control, handleSubmit, reset } = useForm();

  const modalizeRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRef(modalizeRef));
  }, [modalizeRef]);

  const onSubmit = (data) => {
    dispatch(addBook(data.title, data.imageUrl, data.author, data.description));
    reset();
    modalizeRef.current?.close();
  };

  return (
    <Modalize
      onOpened={() => dispatch(modalOpen())}
      onClosed={() => dispatch(modalClose())}
      ref={modalizeRef}
      adjustToContentHeight
    >
      <View style={styles.modal}>
        <View style={styles.addBookContainer}>
          <Text style={styles.addBookText}>Add Book</Text>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <View style={styles.addBookBadge}>
              <Text style={styles.addYourBookText}>Add your book</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Controller
          control={control}
          name="title"
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="author"
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              placeholder="Author"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="imageUrl"
          defaultValue=""
          rules={{
            required: true,
            validate: (val) => {
              if (val.match(/\.(jpeg|jpg|gif|png)$/) === null) {
                return "Please enter a correct image url.";
              }
              return true;
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              placeholder="Image url (Temporary)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              style={styles.descriptionInput}
              placeholder={"Description"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 10,
    marginBottom: 100,
  },
  addBookContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBookText: {
    fontFamily: "rubik-bold",
  },
  addBookBadge: {
    backgroundColor: "#FFF0C1",
    borderRadius: 10,
    padding: 10,
  },
  addYourBookText: {
    color: Colors.primaryColor,
  },
  descriptionInput: {
    height: 90,
  },
});
