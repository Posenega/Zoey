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
  Dimensions,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DirectMessageHeader from "../../components/DirectMessageHeader";
import MessageComposer from "../../components/MessageComposer";
import SentMessage from "../../components/messages/SentMessage";
import ReceivedMessage from "../../components/messages/ReceivedMessage";
import { addMessage, fetchChatMessages } from "../../store/actions/chats";

export default function DirectMessagesScreen(props) {
  const dispatch = useDispatch();

  const socket = useSelector((state) => state.auth.socket);

  useEffect(() => {
    socket?.emit("joinRoom", { roomId: cId });
    socket?.on("message", ({ text, messageId }) => {
      dispatch(addMessage(cId, text, false, messageId));
    });

    return () => {
      socket.off("message");
      socket?.emit("leaveRoom", { roomId: cId });
    };
  }, []);

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

  const screenWidth = Dimensions.get("window").width;

  const renderMessage = (itemData) => {
    let message;
    if (itemData.item.isMine) {
      message = <SentMessage messageText={itemData.item.text} />;
    } else {
      message = <ReceivedMessage messageText={itemData.item.text} />;
    }
    return message;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <DirectMessageHeader
          navigation={props.navigation}
          username={chat.username}
          userImage={chat.userImage}
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
            }}>
            <View style={styles.messageList}>
              <FlatList
                showsVerticalScrollIndicator={false}
                inverted
                style={{ width: "100%" }}
                data={chat.messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item._id}
              />
            </View>
            <KeyboardAvoidingView
              keyboardVerticalOffset={120}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.composerContainer}>
              <View>
                <MessageComposer chatId={cId} />
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
