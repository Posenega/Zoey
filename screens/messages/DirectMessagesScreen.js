import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../../constants/Colors";
import DirectMessageHeader from "../../components/DirectMessageHeader";
import MessageComposer from "../../components/MessageComposer";

const renderMessage = (itemData) => {
  if (!itemData.item.isMe) {
    return (
      <View style={styles.smmc}>
        <View
          style={{
            ...styles.messageContainer,
            ...styles.smc,
          }}
        >
          <Text style={{ ...styles.textMessage, ...styles.stm }}>
            {itemData.item.message}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.rmmc}>
        <View
          style={{
            ...styles.messageContainer,
            ...styles.rmc,
          }}
        >
          <Text style={{ ...styles.textMessage, ...styles.rtm }}>
            {itemData.item.message}
          </Text>
        </View>
      </View>
    );
  }
};

export default function DirectMessagesScreen(props) {
  const messages = [
    { id: "1", message: "Hello dude", isMe: true },
    { id: "2", message: "Heyyz", isMe: false },
  ];
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <View>
          <View style={{ ...styles.messageList, flex: 9 }}>
            <FlatList
              data={messages}
              renderItem={renderMessage}
              stickyHeaderIndices={[0]}
              ListHeaderComponent={
                <DirectMessageHeader navigation={props.navigation} />
              }
            />
          </View>

          <MessageComposer />
        </View>
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

  messageContainer: {
    // minWidth: 100,
    maxWidth: "80%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 10,
    marginVertical: 10,
  },
  smmc: {
    width: "100%",
    alignItems: "flex-start",
  },
  rmmc: {
    width: "100%",
    alignItems: "flex-end",
  },
  smc: {
    backgroundColor: "white",
    borderBottomStartRadius: 0,
    color: "#2b2b2b",
  },
  rmc: {
    backgroundColor: Colors.primaryColor,
    borderBottomEndRadius: 0,
    color: "white",
  },
  textMessage: {
    fontSize: 10,
    lineHeight: 15,
  },
  stm: {
    color: Colors.accentColor,
  },
  rtm: {
    color: "white",
  },
});

export const directMessagesOptions = {
  headerTitle: "Explore",
  headerShown: false,
};
