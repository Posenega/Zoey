import React from "react";
import { View, Text } from "react-native";
import CustomTextInput from "../CustomTextInput";
import { Controller } from "react-hook-form";
import DropDownMenu from "../DropDownMenu";
import Cities from "../../constants/Cities";

export default function StepThree({ control, errors }) {
  return (
    <View style={{ width: "100%" }}>
      <Controller
        name="city"
        rules={{ required: true }}
        initialValue=""
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <DropDownMenu
              text="Select your city"
              items={Cities}
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              error={errors.city?.message}
            />
          );
        }}
      />
    </View>
  );
}
