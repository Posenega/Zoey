import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';

export default function CustomButton(props) {
  return (
    <TouchableWithoutFeedback {...props}>
      <View
        style={{ ...styles.customButton, ...props.containerStyle }}>
        <Text
          style={{ ...styles.customButtonText, ...props.textStyle }}>
          {props.children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  customButton: {
    marginTop: 10,
    height: 43,
    width: 152,
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
  customButtonText: {
    color: 'white',
    fontSize: 14,
  },
});
