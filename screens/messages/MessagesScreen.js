import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import SharedStyles from "../../constants/SharedStyles";
import { useHeaderHeight } from "@react-navigation/elements";
import MessageInfoContainer from "../../components/MessageInfoContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../store/actions/chats";

export default function MessagesScreen(props) {
  const headerHeight = useHeaderHeight();
  const chats = useSelector((state) => state.chats.myChats);
  const isLoading = useSelector((state) => state.chats.isLoading);
  const dispatch = useDispatch();

  const renderChat = (itemData) => {
    return (
      <MessageInfoContainer
        navigation={props.navigation}
        name={itemData.item.username}
        chatId={itemData.item._id}
        userImage={itemData.item.userImage}
        lastMessageText={itemData.item.messages[0]?.text}
      />
    );
  };

  return (
    <View style={{ ...SharedStyles.screen, paddingTop: headerHeight }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChat}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
}

export const messageOptions = {
  headerTitle: "Messages",
};
