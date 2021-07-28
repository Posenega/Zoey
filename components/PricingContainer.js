import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PdfDownload from '../components/Icons/PdfDownload';

export default function PricingContainer(props) {
  return (
    <View style={styles.pricingSheetContainer}>
      <View style={styles.imageHolder}></View>
      <View style={styles.grade}>
        <Text numberOfLines={2} style={styles.gradeName}>
          {props.children}
        </Text>
        <PdfDownload />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pricingSheetContainer: {
    height: 140,
    width: 140,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  imageHolder: {
    flex: 3,
  },
  grade: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#FFC300',
    borderRadius: 10,
    width: '100%',
    marginTop: -5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 29,
  },
  gradeName: {
    fontSize: 13,
    fontFamily: 'rubik-medium',
    color: 'white',
    marginRight: 18,
    textAlign: 'center',
  },
});
