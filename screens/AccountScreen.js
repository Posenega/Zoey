import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import SharedStyles from "../constants/SharedStyles";
import Colors from "../constants/Colors";
import { useForm, Controller } from "react-hook-form";
import ArrowButton from "../components/Icons/ArrowButton";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/actions/auth";
import ImagePicker from "../components/ImagePicker";
import CustomTextInput from "../components/CustomTextInput";

export default function AccountScreen(props) {
  const { control, handleSubmit, reset } = useForm();
  const [localUrl, setLocalUrl] = useState("");
  console.log(localUrl);
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

    dispatch(updateUser(formData));
  };
  return (
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
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                placeholder="First Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <View style={{ marginTop: 10 }}>
            <Controller
              control={control}
              name="lastName"
              defaultValue={lastName}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  placeholder="Last Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <Controller
            control={control}
            name="imageUrl"
            defaultValue={null}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <ImagePicker
                onChange={onChange}
                value={value}
                text="Update profile picture"
                sendData={useCallback((result) => {
                  setLocalUrl(result);
                }, [])}
              />
            )}
          />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.badgeContainer}
          >
            <View style={styles.badge}>
              <Text style={styles.badgText}>Update Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
