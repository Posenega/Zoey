import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import SendButton from "../components/Icons/SendButton";
import Colors from "../constants/Colors";
import { addMessage } from "../store/actions/chats";

export default function MessageComposer({ chatId }) {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(
      addMessage(chatId, data.messageText, true, Math.random().toString())
    );
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

const styles = StyleSheet.create({
  messageComposer: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: 44,
    borderRadius: 10,
  },
  textInputStyle: {
    fontFamily: "rubik-medium",
    fontSize: 12,
  },
  customInput: {
    flex: 1,
  },
  sendButton: {
    height: 34,
    width: 34,
    backgroundColor: Colors.primaryColor,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
