import React, { useState } from "react";
import { Animated } from "react-native";
import Options from "./Options";
import Categories from "../constants/Categories";
import { useDispatch, useSelector } from "react-redux";
import { filterBooks } from "../store/actions/books";
import { filterPackages } from "../store/actions/packages";
import Grades from "../constants/Grades";

export default function BookFilters({ fadeAnim, isPackage }) {
  const isStudent = useSelector((state) => state.auth.isStudent);
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
          const filters = isStudent ? { grades: categories } : { categories };
          if (isPackage) {
            dispatch(filterPackages(filters));
          } else {
            dispatch(filterBooks(filters));
          }
        }}
        value={categoriesFilter}
        items={isStudent ? Grades : Categories}
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
          if (isPackage) {
            dispatch(filterPackages({ otherFilters: toAddOtherFilters }));
          } else {
            dispatch(filterBooks({ otherFilters: toAddOtherFilters }));
          }
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
