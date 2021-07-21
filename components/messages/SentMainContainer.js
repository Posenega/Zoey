import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default function SentMainContainer() {
  return (
    <View style={styles.smmc}>
      <View
        style={{
          ...styles.messageContainer,
          ...styles.smc,
        }}>
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
  );
}

const styles = StyleSheet.create({
  smmc: {
    width: '100%',
    alignItems: 'flex-start',
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
  smc: {
    backgroundColor: 'white',
    borderBottomStartRadius: 0,
    color: '#2b2b2b',
  },
  textMessage: {
    fontSize: 10,
    lineHeight: 15,
  },
  stm: {
    color: Colors.accentColor,
  },
});
