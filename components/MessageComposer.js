import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, TextInput, StyleSheet } from "react-native";
import { connect, useDispatch } from "react-redux";
import SendButton from "../components/Icons/SendButton";
import { getThemeColor } from "../constants/Colors";
import { addMessageRequest } from "../store/actions/chats";

function MessageComposer({ chatId, theme }) {
  const styles = getStyles(theme);
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const isSending = useRef(false);
  const onSubmit = (data) => {
    if (!isSending.current) {
      isSending.current = true;

      dispatch(addMessageRequest(chatId, data.messageText)).then(() => {
        reset();
        isSending.current = false;
      });
    }
  };
  return (
    <View style={styles.messageComposer}>
      <View style={styles.customInput}>
        <Controller
          name="messageText"
          defaultValue=""
          rules={{ required: true }}
          control={control}
          render={({ field: { onBlur, onChange, value } }) => {
            return (
              <TextInput
                placeholderTextColor="#999999"
                style={styles.textInputStyle}
                placeholder="Write a message..."
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            );
          }}
        />
      </View>
      <View style={styles.sendButton}>
        <SendButton onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    messageComposer: {
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      width: "100%",
      height: 50,
      borderRadius: 10,
      backgroundColor: getThemeColor("formBackground", theme),
    },
    textInputStyle: {
      fontFamily: "rubik-medium",
      fontSize: 12,
      color: getThemeColor("text", theme),
    },
    customInput: {
      flex: 1,
    },
    sendButton: {
      height: 34,
      width: 34,
      backgroundColor: getThemeColor("primary", theme),
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default connect(
  (state) => ({
    theme: state.themes.theme,
  }),
  {}
)(MessageComposer);
