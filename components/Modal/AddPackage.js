import React, { useCallback } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Option from "../Option";
import { getThemeColor } from "../../constants/Colors";
import CustomTextInput from "../CustomTextInput";
import { useForm, Controller } from "react-hook-form";
import { requestAddBook } from "../../store/actions/books";
import DropDownMenu from "../DropDownMenu";
import ImagePicker from "../ImagePicker";
import Options from "../Options";
import { requestAddPackage } from "../../store/actions/packages";
import Categories, { schoolSubjects } from "../../constants/Categories";
import Grades from "../../constants/Grades";
import showPricingAlert from "../../helpers/showPricingAlert";
import { useNavigation } from "@react-navigation/native";

function AddPackage(props) {
  const styles = getStyles(props.theme);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  //   const addPackageStatus = useSelector((state) => state.packages.addBookStatus);
  const dispatch = useDispatch();
  const modalizeRef = useSelector((state) => state.addBookModal.ref);
  const navigation = useNavigation();

  const onSubmit = (data) => {
    dispatch(requestAddPackage(data)).then(props.closeModal);
  };
  const isLoading = useSelector((state) => state.packages.addingIsLoading);

  return (
    <View style={styles.modal}>
      <View style={styles.modalHeader}>
        <Text style={styles.headerText}>Add a package</Text>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.badgeContainer}
        >
          <View style={styles.badge}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.badgText}>Add package</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 18, flexDirection: "row" }}>
        <Controller
          name="forSchool"
          defaultValue={false}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Option onChange={onChange} value={value}>
              For School
            </Option>
          )}
        />
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
      {watch("forSchool") && (
        <Controller
          control={control}
          name="grade"
          defaultValue=""
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
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Controller
          control={control}
          name="categories"
          defaultValue={[]}
          rules={{
            validate: (val) => {
              if (val.length < 1) {
                return false;
              }
              return true;
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Options
              style={{ marginBottom: -10 }}
              multipleAllowed={true}
              watch={watch}
              value={value}
              onChange={onChange}
              items={watch("forSchool") ? schoolSubjects : Categories}
            />
          )}
        />
      </View>
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
              onChange={(type) => {
                if (type === "sell" && watch("forSchool")) {
                  showPricingAlert(navigation, modalizeRef?.current.close);
                }
                onChange(type);
              }}
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
          name="localUrl"
          defaultValue={null}
          rules={{ required: "Image is required." }}
          render={({ field: { onChange, value } }) => (
            <ImagePicker
              onChange={onChange}
              value={value}
              text="Add book cover"
              aspect={[2, 3]}
              error={errors.imageUrl?.message}
            />
          )}
        />
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
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
      backgroundColor: getThemeColor("badgeBackground", theme),
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
)(AddPackage);
