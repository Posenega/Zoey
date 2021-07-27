import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import Option from "./Option";

export default function Options({
  items,
  onChange,
  value,
  multipleAllowed,
  style,
}) {
  return (
    <ScrollView
      style={{ ...styles.options, ...style }}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ justifyContent: "center" }}
    >
      {items.map((item) => {
        return (
          <Option
            key={item.value}
            value={
              !multipleAllowed
                ? item.value === value
                : value.includes(item.value)
            }
            onChange={() => {
              if (!multipleAllowed) {
                if (item.value === value) {
                  onChange("");
                }
                onChange(item.value);
              } else {
                if (!Array.isArray(value)) {
                  const oldValue = value;
                  value = [oldValue];
                }
                const index = value.indexOf(item.value);
                if (index >= 0) {
                  value.splice(index, 1);
                } else {
                  value.push(item.value);
                }

                onChange([...value]);
              }
            }}
          >
            {item.label}
          </Option>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  options: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 10,
    paddingLeft: 18,
  },
});
