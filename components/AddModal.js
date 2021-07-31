import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { Modalize } from "react-native-modalize";
import { getThemeColor } from "../constants/Colors";
import { useForm, Controller } from "react-hook-form";
import { addBookFinish } from "../store/actions/books";
import {
  addRef,
  modalOpen,
  modalClose,
  modalSetState,
} from "../store/actions/addBookModal";
import ImagePicker from "./ImagePicker";
import CustomButton from "./CustomButton";
import DropDownMenu from "./DropDownMenu";
import Grades from "../constants/Grades";
import Categories from "../constants/Categories";
import CustomTextInput from "./CustomTextInput";
import Option from "./Option";
import Options from "./Options";
import { requestAddBook } from "../store/actions/books";

function AddModal(props) {
  const screenHeight = Dimensions.get("window").height;
  const addBookStatus = useSelector((state) => state.books.addBookStatus);
  const modalState = useSelector((state) => state.addBookModal.modalState);
  const styles = getStyles(props.theme, screenHeight);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const [localUrl, setLocalUrl] = useState();

  const editedBook = useSelector((state) => state.addBookModal.editedBook);

  const onSubmit = (data) => {
    dispatch(
      requestAddBook({
        author: data.author,
        categories: data.categories,
        condition: data.condition,
        description: data.description,
        grade: data.grade,
        isForSchool: data.forSchool,
        localImageUrl: localUrl,
        price: data.price,
        title: data.title,
        type: data.type,
        isPackage: modalState === "package",
        numberOfBooks: data.numberOfBooks,
      })
    );
  };

  const { reset } = useForm();
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

  return (
    <Modalize
      modalHeight={screenHeight * 0.9}
      alwaysOpen={addBookStatus === "LOADING"}
      onOpened={() => dispatch(modalOpen())}
      onClosed={() => {
        // reset();
        dispatch(modalSetState(null));
        dispatch(modalClose());
      }}
      handlePosition="inside"
      handleStyle={{
        backgroundColor: getThemeColor("text", props.theme),
      }}
      modalStyle={{
        backgroundColor: getThemeColor("main", props.theme),
      }}
      ref={modalizeRef}
    >
      {modalState ? (
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>
              {modalState === "package" ? "Add school package" : "Add book"}
            </Text>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.badgeContainer}
            >
              <View style={styles.badge}>
                {addBookStatus === "LOADING" ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Text style={styles.badgText}>
                    {modalState === "package"
                      ? "Add your package"
                      : "Add your book"}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 18, flexDirection: "row" }}>
            {modalState === "book" && (
              <Controller
                name="forSchool"
                defaultValue={false}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Option
                    onChange={(val) => {
                      onChange(val);
                      if (!val) {
                        setValue("categories", "");
                        setValue("package", false);
                      }
                    }}
                    value={value}
                  >
                    For School
                  </Option>
                )}
              />
            )}
            {/* {watch("forSchool") && (
                  <Controller
                    name="package"
                    defaultValue={false}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Option onChange={onChange} value={value}>
                        Package
                      </Option>
                    )}
                  />
                )} */}
          </View>
          <View style={{ paddingHorizontal: 18, marginBottom: 10 }}>
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
          </View>
          {!watch("forSchool") && (
            <View style={{ paddingHorizontal: 18, marginBottom: 10 }}>
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
          )}
          <View style={{ paddingHorizontal: 18 }}>
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
          </View>
          {modalState === "package" && (
            <View style={{ paddingHorizontal: 18, marginTop: 10 }}>
              <Controller
                control={control}
                name="numberOfBooks"
                defaultValue=""
                rules={{
                  required: "Please provide a valid number.",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    keyboardType="number-pad"
                    placeholder="Number of books"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.numberOfBooks?.message}
                  />
                )}
              />
            </View>
          )}
          {watch("forSchool") && (
            <Controller
              control={control}
              name="grade"
              defaultValue=""
              rules={{
                validate: (val) => {
                  if (val.length <= 0) {
                    return "Please select atleast one grade.";
                  }
                  return true;
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Options
                  style={{ marginBottom: -10 }}
                  watch={watch}
                  value={value}
                  onChange={onChange}
                  items={Grades}
                />
              )}
            />
          )}
          {watch("forSchool") && (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Controller
                control={control}
                name="categories"
                defaultValue={""}
                rules={{
                  validate: (val) => {
                    if (!val || (Array.isArray(val) && val.length <= 0)) {
                      return "Please select atleast one category.";
                    }
                    return true;
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <Options
                    style={{ marginBottom: -10 }}
                    multipleAllowed={watch("package")}
                    watch={watch}
                    value={value}
                    onChange={onChange}
                    items={Categories}
                  />
                )}
              />
            </View>
          )}

          <View style={{ paddingHorizontal: 18 }}>
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
          </View>
          {watch("type") === "sell" ? (
            <View style={{ paddingHorizontal: 18, marginTop: 10 }}>
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
          {!watch("forSchool") && (
            <View style={{ paddingHorizontal: 18 }}>
              <Controller
                control={control}
                name="categories"
                defaultValue=""
                rules={{
                  required: "Category is required.",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DropDownMenu
                    text="Select a category"
                    items={Categories}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    error={errors.categories?.message}
                  />
                )}
              />
            </View>
          )}
          <View style={{ paddingHorizontal: 18 }}>
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
          </View>
          <View style={{ paddingHorizontal: 18 }}>
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
          </View>
        </View>
      ) : (
        <View style={styles.selector}>
          <CustomButton
            containerStyle={{ marginRight: 15 }}
            onPress={() => dispatch(modalSetState("book"))}
          >
            Book
          </CustomButton>
          <CustomButton
            onPress={() => {
              setValue("forSchool", true);
              dispatch(modalSetState("package"));
            }}
          >
            Package
          </CustomButton>
        </View>
      )}
    </Modalize>
  );
}

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(AddModal);
const getStyles = (theme, screenHeight) =>
  StyleSheet.create({
    selector: {
      flex: 1,
      flexDirection: "row",
      height: screenHeight * 0.9,
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      width: "100%",
      paddingVertical: 25,

      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      overflow: "hidden",
    },
    modalHeader: {
      paddingHorizontal: 18,
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
