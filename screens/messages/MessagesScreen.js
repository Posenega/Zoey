import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SharedStyles from '../../constants/SharedStyles';
import { useHeaderHeight } from '@react-navigation/elements';
import MessageInfoContainer from '../../components/MessageInfoContainer';

export default function MessagesScreen(props) {
  const headerHeight = useHeaderHeight();
  return (
    <View
      style={{ ...SharedStyles.screen, paddingTop: headerHeight }}>
      <MessageInfoContainer
        navigation={props.navigation}
        name='Someone'
      />
    </View>
  );
}

export const messageOptions = {
  headerTitle: 'Messages',
};
