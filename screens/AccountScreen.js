import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SharedStyles from "../constants/SharedStyles";
import Colors from "../constants/Colors";
import { useForm, Controller } from "react-hook-form";
import ArrowButton from "../components/Icons/ArrowButton";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/actions/auth";
import ImagePicker from "../components/ImagePicker";
import CustomTextInput from "../components/CustomTextInput";

export default function AccountScreen(props) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [localUrl, setLocalUrl] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);

  const onSubmit = (data) => {
    let formData = new FormData();

    let filename = localUrl.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let fileType = match ? `image/${match[1]}` : `image`;

    localUrl === ""
      ? null
      : formData.append("imageUrl", {
          uri: localUrl,
          name: filename,
          type: fileType,
        });
    formData.append("id", userId);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    data.oldPassword === undefined
      ? null
      : formData.append("old_password", data.oldPassword);
    data.newPassword === undefined
      ? null
      : formData.append("new_password", data.newPassword);

    dispatch(updateUser(formData, setError, props.navigation.goBack));
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
                color="#2b2b2b"
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
                    setLocalUrl(result);
                  }, [])}
                />
              )}
            />
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
              onPress={handleSubmit(onSubmit)}
            >
              <View style={styles.signInButton}>
                <Text style={styles.textSignIn}>Update Profile</Text>
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

const styles = StyleSheet.create({
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
    backgroundColor: Colors.primaryColor,
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
