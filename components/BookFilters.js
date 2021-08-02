import React, { useState } from "react";
import { Animated } from "react-native";
import Options from "./Options";
import Categories from "../constants/Categories";
import { useDispatch } from "react-redux";
import { filterBooks } from "../store/actions/books";

export default function BookFilters({ fadeAnim }) {
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [otherFilters, setOtherFilters] = useState([]);
  const dispatch = useDispatch();
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        height: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 80],
        }),
      }}
    >
      <Options
        multipleAllowed
        onChange={(categories) => {
          setCategoriesFilter(categories);
          dispatch(filterBooks({ categories }));
        }}
        value={categoriesFilter}
        items={Categories}
      />
      <Options
        multipleAllowed
        onChange={(otherFilters, addedFilter) => {
          let toAddOtherFilters = otherFilters;
          if (addedFilter === "Used" && otherFilters.includes("New")) {
            toAddOtherFilters = otherFilters.filter(
              (filter) => filter != "New"
            );
          }
          if (addedFilter === "New" && otherFilters.includes("Used")) {
            toAddOtherFilters = otherFilters.filter(
              (filter) => filter != "Used"
            );
          }
          setOtherFilters(toAddOtherFilters);
          dispatch(filterBooks({ otherFilters: toAddOtherFilters }));
        }}
        value={otherFilters}
        items={[
          { value: "Package" },
          { value: "For School" },
          { value: "Used" },
          { value: "New" },
        ]}
      />
    </Animated.View>
  );
}