import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import SharedStyles from "../constants/SharedStyles";
import Colors, { getThemeColor } from "../constants/Colors";
import { useForm, Controller } from "react-hook-form";
import ArrowButton from "../components/Icons/ArrowButton";
import { connect, useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/actions/auth";
import ImagePicker from "../components/ImagePicker";
import CustomTextInput from "../components/CustomTextInput";
import DropDownMenu from "../components/DropDownMenu";

function AccountScreen(props) {
  const styles = getStyles(props.theme);
  const {
    watch,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const onSubmit = (data) => {
    if (isLoading) {
      return;
    }

    dispatch(updateUser(data, setError, props.navigation.goBack));
    // props.navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={SharedStyles.screen}>
        <View style={styles.header}>
          <View style={styles.topHeader}>
            <View style={{ marginRight: 10 }}>
              <ArrowButton
                onPress={() => {
                  props.navigation.goBack();
                }}
                back
                size={24}
                color={getThemeColor("text", props.theme)}
              />
            </View>
            <Text style={styles.topHeaderText}>Account</Text>
          </View>
          <View>
            <Controller
              control={control}
              name="firstName"
              defaultValue={firstName}
              rules={{ required: "Please provide a first name." }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  placeholder="First Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.firstName?.message}
                />
              )}
            />
            <View style={{ marginTop: 10 }}>
              <Controller
                control={control}
                name="lastName"
                defaultValue={lastName}
                rules={{ required: "Please provide a last name." }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    placeholder="Last Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.lastName?.message}
                  />
                )}
              />
            </View>
            <Controller
              control={control}
              name="imageUrl"
              defaultValue={null}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <ImagePicker
                  onChange={onChange}
                  value={value}
                  text="Update profile picture"
                  aspect={[1, 1]}
                  sendData={useCallback((result) => {
                    setValue("localUrl", result);
                  }, [])}
                />
              )}
            />
            {/* <View
              style={{
                marginTop: 20,
                marginBottom: -10,
                flexDirection: 'row',
              }}>
              <Controller
                name='isStudent'
                initialValue={false}
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Option onChange={onChange} value={value}>
                      I am a student
                    </Option>
                  );
                }}
              />
            </View> */}
            {watch("isStudent") && (
              <Controller
                name="grade"
                initialValue=""
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <DropDownMenu
                      text="Choose Your Grade"
                      onChange={onChange}
                      value={value}
                      items={[{ label: "Grade 1", value: "grade1" }]}
                    />
                  );
                }}
              />
            )}
            <View style={{ marginTop: 10 }}>
              <Controller
                name="oldPassword"
                initialValue=""
                control={control}
                rules={{
                  required: false,
                }}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <CustomTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Old Password"
                      isPassword
                      error={errors.oldPassword?.message}
                    />
                  );
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Controller
                name="newPassword"
                initialValue=""
                control={control}
                rules={{
                  required: false,
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters long.",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <CustomTextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="New Password"
                      isPassword
                      error={errors.newPassword?.message}
                    />
                  );
                }}
              />
            </View>

            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={handleSubmit(onSubmit)}>
              <View style={styles.signInButton}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.textSignIn}>
                    Update Profile
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export const accountOptions = {
  headerTitle: "Account",
};

const getStyles = (theme) =>
  StyleSheet.create({
    header: {
      paddingTop: "10%",
      flex: 1,
      width: "100%",
    },
    topHeader: {
      flexDirection: "row",
      height: 55,
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    topHeaderText: {
      fontFamily: "rubik-bold",
      fontSize: 18,
      color: getThemeColor("text", theme),
    },
    headerContent: {
      flex: 1,
      width: "100%",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#d9d9d9",
      flexDirection: "row",
    },
    imageContainer: {
      justifyContent: "center",
    },
    image: {
      height: 60,
      width: 60,
      borderRadius: 60,
    },
    userInfo: {
      flexDirection: "column",
      padding: 10,
      flex: 6,
      justifyContent: "center",
    },
    welcome: {
      color: "#999999",
      fontSize: 12,
    },
    userName: {
      fontSize: 16,
      fontFamily: "rubik-medium",
      color: "#2b2b2b",
    },
    SignOut: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
      width: "100%",
    },
    body: {
      flex: 3.5,
    },
    firstContainer: {
      marginTop: 30,
    },
    footer: {
      flex: 0.6,
      borderTopWidth: 1,
      borderColor: "#d9d9d9",
      justifyContent: "center",
      alignItems: "center",
    },
    textFooter: {
      color: "#999999",
      fontSize: 10,
      marginVertical: 4,
    },
    signInButton: {
      height: 44,
      width: "100%",
      backgroundColor: getThemeColor("primary", theme),
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      borderRadius: 10,
      flexDirection: "row",
    },
    textSignIn: {
      color: "white",
      fontSize: 14,
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(AccountScreen);
