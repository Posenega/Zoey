import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ArrowButton from './Icons/ArrowButton';

export default function SettingContainer({ style, children, icon }) {
  return (
    <View style={{ ...styles.container, ...style }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {icon}
        {/* <ProfileButton size={20} color='#2b2b2b' /> */}
        <Text style={styles.text}>{children}</Text>
      </View>
      <ArrowButton size={20} color='#2b2b2b' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 10,
    height: 30,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 15,
    fontSize: 14,
    fontFamily: 'rubik-medium',
    color: '#2b2b2b',
  },
});
