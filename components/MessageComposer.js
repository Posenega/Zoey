import React, { useRef, useState, useEffect } from "react";
import { Audio } from "expo-av";
import { Controller, useForm } from "react-hook-form";
import { View, TextInput, StyleSheet } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import SendButton from "../components/Icons/SendButton";
import { getThemeColor } from "../constants/Colors";
import { addMessageRequest, requestAddChat } from "../store/actions/chats";

function MessageComposer({ chatId, theme, userId, navigation }) {
  const styles = getStyles(theme);
  const { control, handleSubmit, reset } = useForm();
  const [sound, setSound] = useState();
  const dispatch = useDispatch();

  const isSending = useRef(false);
  const onSubmit = (data) => {
    if (!isSending.current) {
      const resetInput = () => {
        sound?.replayAsync();
        reset();
        isSending.current = false;
      };
      isSending.current = true;
      if (chatId) {
        dispatch(addMessageRequest(chatId, data.messageText)).then(resetInput);
      } else {
        console.log("Adding room to database");
        dispatch(requestAddChat(userId, data.messageText)).then(resetInput);
      }
    }
  };

  useEffect(() => {
    let hasMounted = true;
    Audio.Sound.createAsync(require("../assets/sentMessageEffect.wav")).then(
      ({ sound }) => {
        if (hasMounted) setSound(sound);
      }
    );
    return () => {
      hasMounted = false;
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
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
      marginTop: 8,
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
