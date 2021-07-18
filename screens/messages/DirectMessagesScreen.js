import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ArrowButton from '../../components/Icons/ArrowButton';
import Colors from '../../constants/Colors';
import MenuButton from '../../components/Icons/MenuButton';
import DirectMessageHeader from '../../components/DirectMessageHeader';

export default function DirectMessagesScreen(props) {
  return (
    <View style={styles.screen}>
      <DirectMessageHeader navigation={props.navigation} />
      <View style={styles.body}></View>
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: '10%',
    paddingHorizontal: 18,
  },
  body: {
    flex: 6,
    backgroundColor: 'red',
  },
});

export const directMessagesOptions = {
  headerTitle: 'Explore',
  headerShown: false,
};
