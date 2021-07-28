import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Option({ onChange, children, value }) {
  const isEnabled = value;

  return (
    <TouchableOpacity
      onPress={() => {
        if (onChange) {
          onChange(!isEnabled);
        }
      }}>
      <View
        style={
          isEnabled
            ? {
                ...styles.editableContainer,
                backgroundColor: '#FFF0C1',
              }
            : styles.editableContainer
        }>
        <View
          style={
            isEnabled
              ? { ...styles.listDesign, backgroundColor: '#FFC300' }
              : styles.listDesign
          }
        />
        <Text
          style={
            isEnabled
              ? { ...styles.editableText, color: '#FFC300' }
              : styles.editableText
          }>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  editableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#EDEDED',
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 15,
  },
  editableText: {
    fontSize: 12,
    color: '#999999',
  },
  listDesign: {
    height: 6,
    width: 6,
    backgroundColor: '#999999',
    borderRadius: 60,
    marginRight: 4,
  },
});
