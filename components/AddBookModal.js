import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableNativeFeedback,
  ActivityIndicator,
} from "react-native";
import { Modalize } from "react-native-modalize";

import Colors from "../constants/Colors";
import CustomTextInput from "./CustomTextInput";
import { useForm, Controller } from "react-hook-form";
import {
  addBook,
  fetchBooks,
  requestAddBook,
  addBookFinish,
  r,
} from "../store/actions/books";
import { addRef, modalOpen, modalClose } from "../store/actions/addBookModal";
import Badge from "./Badge";
import ImageIcon from "./Icons/ImageIcon";
import ArrowButton from "./Icons/ArrowButton";
import DropDownMenu from "./DropDownMenu";
import CoinIcon from "./Icons/CoinIcon";
import ImagePicker from "./ImagePicker";
import { Header } from "@react-navigation/elements";

export default function AddBookModal() {
  const { control, handleSubmit, reset } = useForm();
  const [localUrl, setLocalUrl] = useState();
  const [typeSelector, setTypeSelector] = useState("");
  const [categorySelector, setCategorySelector] = useState("");
  const addBookStatus = useSelector((state) => state.books.addBookStatus);

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
    formData.append("type", typeSelector);
    formData.append("category", categorySelector);

    dispatch(requestAddBook(formData));
  };

  const PriceComponent = () => {
    return (
      <View style={styles.imageSelector}>
        <CoinIcon />
        <Text style={styles.text}>Price</Text>
      </View>
    );
  };

  return (
    <Modalize
      onOpened={() => dispatch(modalOpen())}
      onClosed={() => dispatch(modalClose())}
      ref={modalizeRef}
      adjustToContentHeight
    >
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.headerText}>Add a book</Text>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.badgeContainer}
          >
            <View style={styles.badge}>
              {addBookStatus === "LOADING" ? (
                <ActivityIndicator size="small" color={Colors.primaryColor} />
              ) : (
                <Text style={styles.badgText}>Add your book</Text>
              )}
            </View>
          </TouchableOpacity>
          {/* <Text style={styles.headerText}>Add a book</Text>
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={handleSubmit(onSubmit)}>
            <Badge
              style={styles.badge}
              color={Colors.primaryColor}
              backgroundColor='#FFF0C1'>
              {addBookStatus === 'PENDING' ? (
                <ActivityIndicator size='small' color='#2b2b2b' />
              ) : (
                'Add your book'
              )}
            </Badge>
          </TouchableOpacity> */}
        </View>
        <View style={styles.modalBody}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
            <View style={{ marginVertical: 10 }}>
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
            </View>
            {/* <View style={{ marginBottom: 10 }}>
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
            </View> */}
            <Controller
              control={control}
              name="description"
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  style={{ height: 70 }}
                  multiline
                  placeholder="Description"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <DropDownMenu
              items={[
                { label: "Exchange", value: "exchange" },
                { label: "Sell", value: "sell" },
                { label: "E-Book", value: "e-book" },
              ]}
              onChange={(val) => setTypeSelector(val)}
            />
            {typeSelector === "sell" ? <PriceComponent /> : null}
            <DropDownMenu
              items={[
                { label: "Technology", value: "Technology" },
                { label: "Science", value: "Science" },
              ]}
              onChange={(val) => setCategorySelector(val)}
            />
            <Controller
              control={control}
              name="imageUrl"
              defaultValue={null}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <ImagePicker
                  onChange={onChange}
                  value={value}
                  text="Add book cover"
                  sendData={useCallback((result) => {
                    setLocalUrl(result);
                  }, [])}
                />
              )}
            />
          </ScrollView>
        </View>
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: 451,
    paddingVertical: 20,
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
    color: Colors.accentColor,
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
    color: Colors.primaryColor,
  },
});
