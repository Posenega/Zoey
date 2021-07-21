import React from 'react';
import { View, Text } from 'react-native';
import CustomTextInput from '../CustomTextInput';
import { Controller } from 'react-hook-form';

export default function StepThree({ control, errors }) {
  return (
    <View>
      <Controller
        name='number'
        initialValue=''
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CustomTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='+961 1 234 567'
              error={errors.number?.message}
            />
          );
        }}
      />
    </View>
  );
}
