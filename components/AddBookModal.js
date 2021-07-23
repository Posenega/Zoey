import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Modalize } from "react-native-modalize";

import Colors, { getThemeColor } from "../constants/Colors";
import CustomTextInput from "./CustomTextInput";
import { useForm, Controller } from "react-hook-form";
import { requestAddBook, addBookFinish, r } from "../store/actions/books";
import { addRef, modalOpen, modalClose } from "../store/actions/addBookModal";
import DropDownMenu from "./DropDownMenu";
import CoinIcon from "./Icons/CoinIcon";
import ImagePicker from "./ImagePicker";

function AddBookModal(props) {
  const styles = getStyles(props.theme);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [localUrl, setLocalUrl] = useState();
  const addBookStatus = useSelector((state) => state.books.addBookStatus);
  const editedBook = useSelector((state) => state.addBookModal.editedBook);

  const modalizeRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRef(modalizeRef));
  }, [modalizeRef]);

  useEffect(() => {
    if (addBookStatus === "SUCCESS") {
      reset();
      modalizeRef.current?.close();
      dispatch(addBookFinish());
    }
  }, [addBookStatus]);

  const onSubmit = (data) => {
    let formData = new FormData();

    let filename = localUrl.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let fileType = match ? `image/${match[1]}` : `image`;

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("author", data.author);
    formData.append("imageUrl", {
      uri: localUrl,
      name: filename,
      type: fileType,
    });
    formData.append("type", data.type);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("condition", data.condition);

    dispatch(requestAddBook(formData));
  };

  // const PriceComponent = () => {
  //   return (
  //     <View style={styles.imageSelector}>
  //       <CoinIcon />
  //       <Text style={styles.text}>Price</Text>
  //     </View>
  //   );
  // };

  return (
    <Modalize
      snapPoint={500}
      modalHeight={600}
      alwaysOpen={addBookStatus === "LOADING"}
      onOpened={() => dispatch(modalOpen())}
      onClosed={() => {
        reset();
        dispatch(modalClose());
      }}
      handlePosition="inside"
      handleStyle={{ backgroundColor: getThemeColor("text", props.theme) }}
      modalStyle={{ backgroundColor: getThemeColor("main", props.theme) }}
      ref={modalizeRef}
    >
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.headerText}>
            {editedBook ? "Edit your book" : "Add your book"}
          </Text>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.badgeContainer}
          >
            <View style={styles.badge}>
              {addBookStatus === "LOADING" ? (
                <ActivityIndicator size="small" color={Colors.primaryColor} />
              ) : (
                <Text style={styles.badgText}>
                  {editedBook ? "Edit your book" : "Add your book"}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.modalBody}> */}
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <Controller
          control={control}
          name="title"
          defaultValue=""
          rules={{
            required: "Title is required.",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.title?.message}
            />
          )}
        />
        <View style={{ marginVertical: 10 }}>
          <Controller
            control={control}
            name="author"
            defaultValue=""
            rules={{ required: "Author name is required." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                placeholder="Author"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.author?.message}
              />
            )}
          />
        </View>
        <Controller
          control={control}
          name="description"
          defaultValue=""
          rules={{
            required: "Description is required.",
            minLength: {
              value: 5,
              message: "Description must be greater than 5 characters.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              style={{ height: 70 }}
              multiline
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.description?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="type"
          defaultValue=""
          rules={{
            required: "Type is required.",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownMenu
              text="Select a type"
              items={[
                { label: "Exchange", value: "exchange" },
                { label: "Sell", value: "sell" },
              ]}
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              error={errors.type?.message}
            />
          )}
        />
        {watch("type") === "sell" ? (
          <View style={{ marginVertical: 10 }}>
            <Controller
              control={control}
              name="price"
              defaultValue=""
              rules={{
                required:
                  "Price is required. Otherwise, change the type to exchange.",
                validate: (val) => {
                  if (isNaN(val)) {
                    return "The price should be a number.";
                  }
                  if (val <= 0) {
                    return "The price should be a strictly positive number.";
                  }
                  return true;
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  keyboardType="number-pad"
                  placeholder="Price (in Lebanese Pound)"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.price?.message}
                />
              )}
            />
          </View>
        ) : null}
        <Controller
          control={control}
          name="category"
          defaultValue=""
          rules={{
            required: "Category is required.",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownMenu
              text="Select a category"
              items={[
                { label: "Technology", value: "Technology" },
                { label: "Science", value: "Science" },
              ]}
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              error={errors.category?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="condition"
          defaultValue=""
          rules={{
            required: "Condition is required.",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownMenu
              text="Select the book's condition"
              items={[
                { label: "New", value: "new" },
                { label: "Used", value: "used" },
              ]}
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              error={errors.condition?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="imageUrl"
          defaultValue={null}
          rules={{ required: "Image is required." }}
          render={({ field: { onChange, value } }) => (
            <ImagePicker
              onChange={onChange}
              value={value}
              text="Add book cover"
              aspect={[2, 3]}
              sendData={useCallback((result) => {
                setLocalUrl(result);
              }, [])}
              error={errors.imageUrl?.message}
            />
          )}
        />
        {/* </View> */}
      </View>
    </Modalize>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    modal: {
      width: "100%",
      paddingVertical: 25,
      paddingHorizontal: 18,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      overflow: "hidden",
    },
    modalHeader: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    badge: {
      height: 22,
      width: "30%",
    },
    headerText: {
      fontFamily: "rubik-bold",
      fontSize: 18,
      color: getThemeColor("text", theme),
    },
    modalBody: {
      flex: 14,
    },
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
    badgeContainer: {
      width: "30%",
      height: 22,
    },
    badge: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      borderRadius: 8,
      alignItems: "center",
      backgroundColor: "#FFF0C1",
      borderRadius: 6,
    },
    badgText: {
      fontSize: 9,
      color: getThemeColor("primary", theme),
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(AddBookModal);
