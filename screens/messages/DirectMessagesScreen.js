import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  ScrollView,
} from "react-native";
import Colors from "../../constants/Colors";
import DirectMessageHeader from "../../components/DirectMessageHeader";
import MessageComposer from "../../components/MessageComposer";

export default function DirectMessagesScreen(props) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <DirectMessageHeader navigation={props.navigation} />
        <View style={{ paddingHorizontal: 18, flex: 9 }}>
          <View style={styles.messageList}>
            <ScrollView>
              <View style={styles.smmc}>
                <View
                  style={{
                    ...styles.messageContainer,
                    ...styles.smc,
                  }}
                >
                  <Text style={{ ...styles.textMessage, ...styles.stm }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean a nunc imperdiet sapien egestas sodales eget ac
                    ligula. Quisque vel interdum est. Nunc porta, tellus vitae
                    scelerisque euismod, nisi nunc posuere odio, vel aliquet
                    nibh massa sed magna. Aliquam erat volutpat. Nam faucibus
                    elementum tellus sed aliquam. Curabitur molestie, ante eu
                    malesuada laoreet,
                  </Text>
                </View>
              </View>

              <View style={styles.rmmc}>
                <View
                  style={{
                    ...styles.messageContainer,
                    ...styles.rmc,
                  }}
                >
                  <Text style={{ ...styles.textMessage, ...styles.rtm }}>
                    Lorem ipsum
                  </Text>
                </View>
              </View>
              <View style={styles.smmc}>
                <View
                  style={{
                    ...styles.messageContainer,
                    ...styles.smc,
                  }}
                >
                  <Text style={{ ...styles.textMessage, ...styles.stm }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean a nunc imperdiet sapien egestas sodales eget ac
                    ligula. Quisque vel interdum est. Nunc porta, tellus vitae
                    scelerisque euismod, nisi nunc posuere odio, vel aliquet
                    nibh massa sed magna. Aliquam erat volutpat. Nam faucibus
                    elementum tellus sed aliquam. Curabitur molestie, ante eu
                    malesuada laoreet,
                  </Text>
                </View>
              </View>

              <View style={styles.rmmc}>
                <View
                  style={{
                    ...styles.messageContainer,
                    ...styles.rmc,
                  }}
                >
                  <Text style={{ ...styles.textMessage, ...styles.rtm }}>
                    Lorem ipsum
                  </Text>
                </View>
              </View>
              <View style={styles.smmc}>
                <View
                  style={{
                    ...styles.messageContainer,
                    ...styles.smc,
                  }}
                >
                  <Text style={{ ...styles.textMessage, ...styles.stm }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean a nunc imperdiet sapien egestas sodales eget ac
                    ligula. Quisque vel interdum est. Nunc porta, tellus vitae
                    scelerisque euismod, nisi nunc posuere odio, vel aliquet
                    nibh massa sed magna. Aliquam erat volutpat. Nam faucibus
                    elementum tellus sed aliquam. Curabitur molestie, ante eu
                    malesuada laoreet,
                  </Text>
                </View>
              </View>

              <View style={styles.rmmc}>
                <View
                  style={{
                    ...styles.messageContainer,
                    ...styles.rmc,
                  }}
                >
                  <Text style={{ ...styles.textMessage, ...styles.rtm }}>
                    Lorem ipsum
                  </Text>
                </View>
              </View>
              <View style={styles.smmc}>
                <View
                  style={{
                    ...styles.messageContainer,
                    ...styles.smc,
                  }}
                >
                  <Text style={{ ...styles.textMessage, ...styles.stm }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean a nunc imperdiet sapien egestas sodales eget ac
                    ligula. Quisque vel interdum est. Nunc porta, tellus vitae
                    scelerisque euismod, nisi nunc posuere odio, vel aliquet
                    nibh massa sed magna. Aliquam erat volutpat. Nam faucibus
                    elementum tellus sed aliquam. Curabitur molestie, ante eu
                    malesuada laoreet,
                  </Text>
                </View>
              </View>

              <View style={styles.rmmc}>
                <View
                  style={{
                    ...styles.messageContainer,
                    ...styles.rmc,
                  }}
                >
                  <Text style={{ ...styles.textMessage, ...styles.rtm }}>
                    Lorem ipsum
                  </Text>
                </View>
              </View>
              <View style={styles.smmc}>
                <View
                  style={{
                    ...styles.messageContainer,
                    ...styles.smc,
                  }}
                >
                  <Text style={{ ...styles.textMessage, ...styles.stm }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean a nunc imperdiet sapien egestas sodales eget ac
                    ligula. Quisque vel interdum est. Nunc porta, tellus vitae
                    scelerisque euismod, nisi nunc posuere odio, vel aliquet
                    nibh massa sed magna. Aliquam erat volutpat. Nam faucibus
                    elementum tellus sed aliquam. Curabitur molestie, ante eu
                    malesuada laoreet,
                  </Text>
                </View>
              </View>

              <View style={styles.rmmc}>
                <View
                  style={{
                    ...styles.messageContainer,
                    ...styles.rmc,
                  }}
                >
                  <Text style={{ ...styles.textMessage, ...styles.rtm }}>
                    Lorem ipsum
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.composerContainer}>
            <MessageComposer />
          </View>
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
  composerContainer: {
    flex: 1,
  },
  messageContainer: {
    // minWidth: 100,
    maxWidth: 275,
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
