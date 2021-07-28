import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ArrowButton from '../components/Icons/ArrowButton';
import PricingContainer from '../components/PricingContainer';
import SharedStyles from '../constants/SharedStyles';

export default function PricingScreen(props) {
  return (
    <View style={SharedStyles.screen}>
      <View style={styles.screen}>
        <View style={styles.topHeader}>
          <View style={{ marginRight: 10 }}>
            <ArrowButton
              onPress={() => {
                props.navigation.goBack();
              }}
              back
              size={24}
              color='#2b2b2b'
            />
          </View>
          <Text style={styles.topHeaderText}>Pricing</Text>
        </View>
        <Text
          style={{ fontSize: 12, color: '#575757', marginBottom: 5 }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'rubik-bold',
              color: '#2b2b2b',
            }}>
            Notice:
          </Text>{' '}
          We provide you sheets that you can download and read to be
          aware of the average price of each book.
        </Text>
        <View
          style={{
            width: '100%',
            height: 2,
            backgroundColor: '#2b2b2b',
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View style={styles.leftColumn}>
              <PricingContainer>Grade 1</PricingContainer>
              <PricingContainer>Grade 3</PricingContainer>
              <PricingContainer>Grade 5</PricingContainer>
              <PricingContainer>Grade 7</PricingContainer>
              <PricingContainer>Grade 9</PricingContainer>
              <PricingContainer>Grade 11</PricingContainer>
              <PricingContainer>
                Grade 12 Litterature
              </PricingContainer>
              <PricingContainer>Grade 13 Biology</PricingContainer>
              <PricingContainer>
                Grade 13 Litterature
              </PricingContainer>
            </View>
            <View>
              <PricingContainer>Grade 2</PricingContainer>
              <PricingContainer>Grade 4</PricingContainer>
              <PricingContainer>Grade 6</PricingContainer>
              <PricingContainer>Grade 8</PricingContainer>
              <PricingContainer>Grade 10</PricingContainer>
              <PricingContainer>Grade 12 Scientific</PricingContainer>
              <PricingContainer>
                Grade 13 General Science
              </PricingContainer>
              <PricingContainer>
                Grade 13 Economy Science
              </PricingContainer>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export const pricingOptions = {
  headerTitle: 'Pricing',
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: '10%',
    flex: 1,
    width: '100%',
  },
  topHeader: {
    flexDirection: 'row',
    height: 55,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topHeaderText: {
    fontFamily: 'rubik-bold',
    fontSize: 18,
    color: '#2b2b2b',
  },
  body: {
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1,
  },
});
