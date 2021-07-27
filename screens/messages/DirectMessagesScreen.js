import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DirectMessageHeader from "../../components/DirectMessageHeader";
import MessageComposer from "../../components/MessageComposer";
import SentMessage from "../../components/messages/SentMessage";
import ReceivedMessage from "../../components/messages/ReceivedMessage";
import { addMessage, fetchChatMessages } from "../../store/actions/chats";
import io from "socket.io-client";

let socket;

export default function DirectMessagesScreen(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    socket = io(axios.defaults.baseURL, {
      extraHeaders: {
        Authorization: "Bearer " + token,
      },
    });
    socket?.emit("joinRoom", { roomId: cId });
    socket?.on("message", ({ text, messageId }) => {
      console.log("sentMessage");
      dispatch(addMessage(cId, text, false, messageId));
    });

    return () => {
      socket?.emit("leaveRoom", { roomId: cId });
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {}, [socket, cId]);

  const { userId, chatId } = props.route.params;
  const chat = useSelector((state) =>
    state.chats.myChats.find((chat) => {
      if (userId) {
        return chat.userId === userId;
      } else {
        return chat._id === chatId;
      }
    })
  );

  const cId = chat._id;

  useEffect(() => {
    dispatch(fetchChatMessages(cId));
  }, [dispatch, cId]);

  const renderMessage = (itemData) => {
    if (itemData.item.isMine) {
      return <SentMessage messageText={itemData.item.text} />;
    } else {
      return <ReceivedMessage messageText={itemData.item.text} />;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <DirectMessageHeader
          navigation={props.navigation}
          username={chat.username}
        />
        {chat.isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#2b2b2b" />
          </View>
        ) : (
          <View
            style={{
              flex: 9,
              paddingHorizontal: 18,
              marginBottom: 1,
            }}
          >
            <View style={styles.messageList}>
              <FlatList
                inverted
                style={{ width: "100%" }}
                data={chat.messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item._id}
              />
            </View>
            <KeyboardAvoidingView
              keyboardVerticalOffset={120}
              behavior={Platform.OS === "ios" ? "padding" : null}
              style={styles.composerContainer}
            >
              <View>
                <MessageComposer chatId={chatId} socket={socket} />
              </View>
            </KeyboardAvoidingView>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: "#EDEDED",
  },

  messageList: {
    width: "100%",
    flex: 10,
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  composerContainer: {
    flex: 0.9,
    marginBottom: 20,
  },
  center: {
    flex: 9,
    paddingHorizontal: 18,
    marginBottom: 1,
    textAlign: "center",
    justifyContent: "center",
  },
});

export const directMessagesOptions = {
  headerTitle: "Explore",
  headerShown: false,
};
