import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DirectMessageHeader from '../../components/DirectMessageHeader';
import MessageComposer from '../../components/MessageComposer';
import ReceivedMainContainer from '../../components/messages/ReceivedMainContainer';
import SentMainContainer from '../../components/messages/SentMainContainer';

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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <DirectMessageHeader navigation={props.navigation} />
        <View
          style={{
            flex: 9,
            paddingHorizontal: 18,
            marginBottom: 1,
          }}>
          <KeyboardAvoidingView
            behavior={
              Platform.OS === 'android' ? 'height' : 'padding'
            }
            style={{ flex: 1 }}
            keyboardVerticalOffset={30}>
            <View style={styles.messageList}>
              <ScrollView>
                <ReceivedMainContainer />
                <SentMainContainer />
              </ScrollView>
            </View>
            <View style={styles.composerContainer}>
              <MessageComposer />
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  messageList: {
    flex: 10,
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  composerContainer: {
    flex: 1,
    marginBottom: 20,
  },
});

export const directMessagesOptions = {
  headerTitle: 'Explore',
  headerShown: false,
};
