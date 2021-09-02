import React, { useState } from "react";
import { Animated } from "react-native";
import Options from "./Options";
import Categories from "../constants/Categories";
import { useDispatch, useSelector } from "react-redux";
import { filterBooks } from "../store/actions/books";
import { filterPackages } from "../store/actions/packages";
import SchoolSubjects from "../constants/SchoolSubjects";
import Grades from "../constants/Grades";

export default function BookFilters({ fadeAnim, isPackage }) {
  const isStudent = useSelector((state) => state.auth.isStudent);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [gradesFilters, setGradesFilters] = useState([]);
  const [otherFilters, setOtherFilters] = useState([]);

  const dispatch = useDispatch();
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        height: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: isPackage ? [0, 120] : [0, 80],
        }),
      }}
    >
      <Options
        multipleAllowed
        onChange={(categories) => {
          setCategoriesFilter(categories);

          if (isPackage) {
            dispatch(filterPackages({ categories }));
          } else {
            dispatch(filterBooks({ categories }));
          }
        }}
        value={categoriesFilter}
        items={isStudent ? SchoolSubjects : Categories}
      />
      {isPackage && (
        <Options
          multipleAllowed
          onChange={(grades) => {
            setGradesFilters(grades);

            dispatch(filterPackages({ grades }));
          }}
          value={categoriesFilter}
          items={Grades}
        />
      )}
      <Options
        multipleAllowed
        onChange={(otherFilters, addedFilter) => {
          let toAddOtherFilters = otherFilters;
          if (addedFilter === "used" && otherFilters.includes("new")) {
            toAddOtherFilters = otherFilters.filter(
              (filter) => filter != "new"
            );
          }
          if (addedFilter === "new" && otherFilters.includes("used")) {
            toAddOtherFilters = otherFilters.filter(
              (filter) => filter != "used"
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
          { value: "For School" },
          { label: "Used", value: "used" },
          { label: "New", value: "new" },
        ]}
      />
    </Animated.View>
  );
}
