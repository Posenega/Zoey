import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import ArrowButton from './Icons/ArrowButton';
import Colors from '../constants/Colors';

export default function DropDownMenu(props) {
  const styles = StyleSheet.create({
    typeContainer: {
      width: '100%',
      backgroundColor: props.error ? '#FFDCDC' : '#ededed',
      marginTop: 10,
      borderRadius: 10,
      overflow: 'hidden',
      paddingHorizontal: 12,
    },
    header: {
      height: 44,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    item: {
      height: 25,
      justifyContent: 'center',
    },
    typeText: {
      fontSize: 12,
      color: props.error ? '#E24949' : '#999999',
    },
    itemText: {
      fontSize: 12,
      fontFamily: 'rubik-medium',
      color: Colors.accentColor,
    },
    errorText: {
      fontSize: 10,
      marginLeft: 10,
      marginTop: 0.5,
      color: '#999999',
    },
  });
  const [currentValue, setCurrentValue] = useState(props.value || '');
  const [currentLabel, setCurrentLabel] = useState(
    props.value
      ? props.items.find((item) => item.value === props.value).label
      : ''
  );

  useEffect(() => {
    props.onChange(currentValue);
  }, [currentValue]);

  const toggleCollapse = () => {
    Animated.timing(collapseAnimation, {
      toValue:
        collapseAnimation._value == MAX_HEIGHT
          ? MIN_HEIGHT
          : MAX_HEIGHT,
      duration: 650,
      useNativeDriver: false,
    }).start();
  };
  const MIN_HEIGHT = 44;
  const MAX_HEIGHT = 44 + props.items.length * 25 + 12;
  const collapseAnimation = useRef(
    new Animated.Value(MIN_HEIGHT)
  ).current;

  const spin = collapseAnimation.interpolate({
    inputRange: [MIN_HEIGHT, MAX_HEIGHT],
    outputRange: ['90deg', '-90deg'],
  });

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleCollapse}>
        <Animated.View
          style={{
            ...styles.typeContainer,
            height: collapseAnimation,
          }}>
          <View style={styles.header}>
            <Text
              style={
                currentLabel ? styles.itemText : styles.typeText
              }>
              {currentLabel || props.text}
            </Text>

            <ArrowButton
              onPress={toggleCollapse}
              SvgStyle={{ transform: [{ rotate: spin }] }}
              size={20}
              color='#999999'
            />
          </View>
          {props.items.map((item) => {
            return (
              <TouchableWithoutFeedback
                key={item.value}
                onPress={() => {
                  toggleCollapse();
                  setCurrentValue(item.value);
                  setCurrentLabel(item.label);
                }}>
                <View
                  style={{
                    ...styles.item,
                  }}>
                  <Text style={styles.itemText}>{item.label}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </Animated.View>
      </TouchableWithoutFeedback>
      {props.error && (
        <Text style={styles.errorText}>{props.error}</Text>
      )}
    </View>
  );
}
