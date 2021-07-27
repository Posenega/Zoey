import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

import Option from './Option';

export default function Options({ items, onChange, value, watch }) {
  const [selectedOption, setSelectedOption] = useState(value || '');

  useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption]);
  return (
    <View
      style={{
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 10,
      }}>
      <ScrollView
        style={{
          marginBottom: -10,
          // backgroundColor: 'red',
          paddingLeft: 18,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {items.map((item) => {
          return (
            <Option
              preventDefault
              key={item.value}
              value={item.value === watch('grade')}
              onPress={() => {
                setSelectedOption(item.value);
              }}>
              {item.label}
            </Option>
          );
        })}
      </ScrollView>
    </View>
  );
}
