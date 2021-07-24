import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DirectMessageHeader from "../../components/DirectMessageHeader";
import MessageComposer from "../../components/MessageComposer";
import SentMessage from "../../components/messages/SentMessage";
import ReceivedMessage from "../../components/messages/ReceivedMessage";
import { fetchChatMessages } from "../../store/actions/chats";

export default function DirectMessagesScreen(props) {
  // const [keyboardOffset, setKeyboardOffset] = useState(0);

  // useEffect(() => {
  //   Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
  //   Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
  // }, []);

  // const _keyboardDidShow = (event) => {
  //   setKeyboardOffset(event.endCoordinates.height);
  // };
  // const _keyboardDidHide = () => {
  //   setKeyboardOffset(0);
  // };
  const dispatch = useDispatch();

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

  const cId = chat.id;

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
        {chat.isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <DirectMessageHeader
              navigation={props.navigation}
              username={chat.username}
            />
            <View
              style={{
                flex: 9,
                paddingHorizontal: 18,
                marginBottom: 1,
              }}
            >
              <View style={styles.messageList}>
                <FlatList
                  data={chat.messages}
                  renderItem={renderMessage}
                  keyExtractor={(item) => item._id}
                />
              </View>
              <View style={styles.composerContainer}>
                <MessageComposer chatId={chatId} />
              </View>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },
  messageList: {
    flex: 10,
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  composerContainer: {
    flex: 0.9,
    marginBottom: 20,
  },
});

export const directMessagesOptions = {
  headerTitle: "Explore",
  headerShown: false,
};
