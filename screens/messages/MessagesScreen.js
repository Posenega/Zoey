import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import SharedStyles from "../../constants/SharedStyles";
import { useHeaderHeight } from "@react-navigation/elements";
import MessageInfoContainer from "../../components/MessageInfoContainer";
import { useSelector } from "react-redux";

export default function MessagesScreen(props) {
  const headerHeight = useHeaderHeight();
  const chats = useSelector((state) => state.chats.myChats);
  const renderChat = (itemData) => {
    return (
      <MessageInfoContainer
        navigation={props.navigation}
        name={itemData.item.username}
        chatId={itemData.item._id}
      />
    );
  };
  console.log(chats);
  return (
    <View style={{ ...SharedStyles.screen, paddingTop: headerHeight }}>
      <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

export const messageOptions = {
  headerTitle: "Messages",
};
